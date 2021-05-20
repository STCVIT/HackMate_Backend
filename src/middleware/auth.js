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
const idToken=req.header('Authorization').replace('Bearer ', '')
admin
  .auth()
  .verifyIdToken(idToken)
  .then((user) => {
    const uid = user.uid;
        if (!user.email_verified){
          return res.send('Please Verify Your Email Address!')
        }
        else{
          req.userId=uid
          req.email=user.email
          req.idToken = idToken
          next()
          console.log('i am exiting check User')
          console.log(user)
       }
  })
  .catch((error) => {
    res.status(404).send(error)
  });
})


const setClaimParticipant = ((req,res) =>{
  const uid = req.userId
  console.log(uid)
  admin
  .auth()
  .setCustomUserClaims(uid, { participant : true })
  .then(()=>{
  res.status(201).send(req.participant)
})
  .catch((e)=>{
    errorHandler(new BadRequestError,req,res)
  })
})

const checkClaimParticipant = ((req,res,next)=>{
  const idToken = req.idToken
  admin
  .auth()
  .verifyIdToken(idToken)
  .then((claims) => {
    console.log('hi')
    console.log(claims.participant)
    if (claims.participant === true) {
      next()
    }
    else{
      return res.send('ni bhai ye scheme tere liye ni hai')
    }
  })
})

const setClaimOrganiser = ((req,res,next) =>{
  console.log('entered claim fn')
  const uid = req.userId
  admin
  .auth()
  .setCustomUserClaims(uid, { organiser : true })
  .then(()=>{
  console.log('leaving')
  res.status(201).send(req.organiser)  
})
  .catch((e)=>{
  res.send('Claim not set')
  })
})

const checkClaimOrganiser = ((req,res,next)=>{
  const idToken = req.idToken
  console.log(idToken)
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
    console.log('odne')
    res.send('kardiya delete bhai')
    //successHandler(new ResourceDeletedSuccess,req,res)
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