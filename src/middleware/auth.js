const e = require("express");
const admin = require("firebase-admin");

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const errorHandler = require("../middleware/errorHandler");
const successHandler = require("../middleware/successHandler");
const {
  BadRequestError,
  AuthenticationError,
  EmailUnauthorizedError,
  ClaimError,
  LoginNotAllowedError,
  ClaimNotSetError,
} = require("../utils/error");
const {
  ResourceDeletedSuccess,
  ResourceCreatedSuccess,
} = require("../utils/success");

const env = process.env;

var serviceAccount = {
  type: env.type,
  project_id: env.project_id,
  private_key_id: env.private_key_id,
  private_key: env.private_key.replace(/\\n/g, "\n"),
  client_email: env.client_email,
  client_id: env.client_id,
  auth_uri: env.auth_uri,
  token_uri: env.token_uri,
  auth_provider_x509_cert_url: env.auth_provider_x509_cert_url,
  client_x509_cert_url: env.client_x509_cert_url,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const checkUser = (req, res, next) => {
  if (
    !req.header("Authorization") ||
    req.header("Authorization") == undefined
  ) {
    return errorHandler(new AuthenticationError(), req, res);
  }
  const idToken = req.header("Authorization").replace("Bearer ", "");

  admin
    .auth()
    .verifyIdToken(idToken)
    .then((user) => {
      const uid = user.uid;
      if (!user.email_verified) {
        return errorHandler(new EmailUnauthorizedError(), req, res);
      } else {
        req.userId = uid;
        req.email = user.email;
        req.idToken = idToken;
        next();
      }
    })
    .catch((error) => {
      errorHandler(new AuthenticationError(), req, res);
    });
};

const setClaimParticipant = (req, res) => {
  if (
    !req.header("Authorization") ||
    req.header("Authorization") == undefined
  ) {
    return errorHandler(new AuthenticationError(), req, res);
  }
  const idToken = req.header("Authorization").replace("Bearer ", "");
  let Uid = "";
  admin
    .auth()
    .verifyIdToken(idToken)
    .then((user) => {
      Uid = user.uid;
    })
    .then(() => {
      admin
        .auth()
        .setCustomUserClaims(Uid, { participant: true })
        .then(() => {
          return successHandler(new ResourceCreatedSuccess(), req, res);
        });
    })
    .catch((e) => {
      return errorHandler(new BadRequestError(), req, res);
    });
};

const checkClaimParticipant = (req, res, next) => {
  const idToken = req.idToken;
  admin
    .auth()
    .verifyIdToken(idToken)
    .then((claims) => {
      if (claims.organiser === true) {
        return errorHandler(new LoginNotAllowedError(), req, res);
      }
      if (!claims.organiser && !claims.participant) {
        return errorHandler(new ClaimNotSetError(), req, res);
      }
      if (claims.participant === true) {
        return next();
      }
    });
};

const setClaimOrganiser = (req, res) => {
  if (
    !req.header("Authorization") ||
    req.header("Authorization") == undefined
  ) {
    return errorHandler(new AuthenticationError(), req, res);
  }
  const idToken = req.header("Authorization").replace("Bearer ", "");
  let Uid = "";
  admin
    .auth()
    .verifyIdToken(idToken)
    .then((user) => {
      Uid = user.uid;
      console.log(Uid);
    })
    .then(() => {
      admin
        .auth()
        .setCustomUserClaims(Uid, { organiser: true })
        .then(() => {
          return successHandler(new ResourceCreatedSuccess(), req, res);
        });
    })
    .catch((e) => {
      errorHandler(new BadRequestError(), req, res);
    });
};

const checkClaimOrganiser = (req, res, next) => {
  const idToken = req.idToken;
  admin
    .auth()
    .verifyIdToken(idToken)
    .then((claims) => {
      console.log(claims);
      if (claims.participant === true) {
        return errorHandler(new LoginNotAllowedError(), req, res);
      }
      if (!claims.organiser && !claims.participant) {
        return errorHandler(new ClaimNotSetError(), req, res);
      }
      if (claims.organiser === true) {
        next();
      }
    });
};

const deleteUser = async (req, res) => {
  const uid = req.userId;
  await admin.auth().deleteUser(uid);
  return successHandler(new ResourceDeletedSuccess(), res);
};

module.exports = {
  checkUser,
  setClaimParticipant,
  checkClaimParticipant,
  setClaimOrganiser,
  checkClaimOrganiser,
  deleteUser,
};
