const admin = require("firebase-admin");

const path = require('path')
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const errorHandler = require('../middleware/errorHandler')
const successHandler = require('../middleware/successHandler')
const {BadRequestError} = require('../utils/error')
const {ResourceDeletedSuccess} = require('../utils/success')

const env=process.env

var serviceAccount = {
  "type": env.type,
  "project_id":env.project_id,
  "private_key_id": env.private_key_id,
  "private_key": env.private_key.replace(/\\n/g, '\n'),
  "client_email": env.client_email,
  "client_id": env.client_id,
  "auth_uri": env.auth_uri,
  "token_uri": env.token_uri,
  "auth_provider_x509_cert_url": env.auth_provider_x509_cert_url,
  "client_x509_cert_url": env.client_x509_cert_url
}


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const checkUser=((req,res,next)=>{
  if(!req.header('Authorization')||(req.header('Authorization')==undefined)){
    return res.status(401).send('oof')
  }
const idToken=req.header('Authorization').replace('Bearer ', '')

admin
  .auth()
  .verifyIdToken(idToken)
  .then((user) => {
    const uid = user.uid;
        if (!user.email_verified){
          return res.status(400).send('Please Verify Your Email Address!')
        }
        else{
          req.userId=uid
          req.email=user.email
          req.idToken = idToken
          next()
       }
  })
  .catch((error) => {
    res.status(401).send(error)
  });
})


const setClaimParticipant = ((req,res) =>{
  const idToken=req.header('Authorization').replace('Bearer ', '')
let Uid ='';
admin
  .auth()
  .verifyIdToken(idToken)
  .then((user)=>{
    Uid = user.uid
  }).then(()=>{
    admin
    .auth()
    .setCustomUserClaims(Uid, { participant : true })
    .then(()=>{
      res.status(201).send('hi')
    })
  })
  .catch((e)=>{
   res.status(400).send('no')
  })
})

const checkClaimParticipant = ((req,res,next)=>{
  const idToken = req.idToken
  admin
  .auth()
  .verifyIdToken(idToken)
  .then((claims) => {
    if (claims.participant === true) {
      next()
    }
    else{
      return res.send('ni bhai ye scheme tere liye ni hai')
    }
  })
})

const setClaimOrganiser = ((req,res) =>{
  const idToken=req.header('Authorization').replace('Bearer ', '')
let Uid ='';
admin
  .auth()
  .verifyIdToken(idToken)
  .then((user)=>{
    Uid = user.uid
    console.log(Uid)
  }).then(()=>{
    admin
    .auth()
    .setCustomUserClaims(Uid, { organiser : true })
    .then(()=>{
      res.status(201).send('hi')
    })
  })
  .catch((e)=>{
   res.status(400).send('no')
  })
})

const checkClaimOrganiser = ((req,res,next)=>{
  const idToken = req.idToken
admin
  .auth()
  .verifyIdToken(idToken)
  .then((claims) => {
    if (claims.organiser === true) {
      next()
    }
    else{
      return res.send('ni bhai ye scheme tere liye ni hai')
    }
  })
})

const deleteUser = (req,res)=>{
  const uid = req.userId
  admin
  .auth()
  .deleteUser(uid)
  .then(() => {
    res.send('kardiya delete bhai')
  })
  .catch((error) => {
    errorHandler(new BadRequestError,req,res)
  });
}

module.exports={
    checkUser,
    setClaimParticipant,
    checkClaimParticipant,
    setClaimOrganiser,
    checkClaimOrganiser,
    deleteUser
}