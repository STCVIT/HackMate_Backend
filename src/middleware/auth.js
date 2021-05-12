var admin = require("firebase-admin");

const path = require('path')
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

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

const run=((req,res,next)=>{
const idToken=req.header('Authorization').replace('Bearer ', '')
admin
  .auth()
  .verifyIdToken(idToken)
  .then((decodedToken) => {
    const uid = decodedToken.uid;
    admin.auth().getUser(uid).then((user)=>{
      if (!user.emailVerified){
        return res.send('Please Verify Your Email Address!')
       }
       else{
         req.userId=uid
         req.email=user.email
        next()
       }
    })
    
  })
  .catch((error) => {
    res.status(404).send(error)
  });
})
  module.exports=run