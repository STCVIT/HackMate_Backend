const mongoose = require('mongoose')

const test = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    randomNum:{
        type : Number,
        required : true
    }
    
})

const test2 = new mongoose.Schema({
    randomNum: {
        type: Number,
        required: true
    }
})

// test.virtual('count').get(()=>{
//     const abc = 8
//     return abc
// })

const Test = mongoose.model('Test',test)
const Test2 = mongoose.model('Test2',test2)
module.exports = {Test,Test2}



// idtoken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjhmNDMyMDRhMTc5MTVlOGJlN2NjZDdjYjI2NGRmNmVhMzgzYzQ5YWIiLCJ0eXAiOiJKV1QifQ.eyJwYXJ0aWNpcGFudCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2hhY2twb3J0YWwtNDUwZDAiLCJhdWQiOiJoYWNrcG9ydGFsLTQ1MGQwIiwiYXV0aF90aW1lIjoxNjI2MDY2NTEwLCJ1c2VyX2lkIjoiVHRzRlNLNVZydVpma3N0NjZ5eWRTRVE2YTNIMyIsInN1YiI6IlR0c0ZTSzVWcnVaZmtzdDY2eXlkU0VRNmEzSDMiLCJpYXQiOjE2MjYwNjY1MTAsImV4cCI6MTYyNjA3MDExMCwiZW1haWwiOiJkZWVwZ2FuZGhpMTUxQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImRlZXBnYW5kaGkxNTFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.Oa6qEAt6rfgf3qdDeKtg9V7x3h6bVVI980LHEZdR-TXHb5PeGXl_BUg9la7X_GluDo16ahwc52YTlOq4ArTS5RBGkdTFfnExxE5uGpDfVg0i4_BktDlksYZo_xI0idJ5fefBGuSNnVL5PaBE9fWhiid3Nf38A--TyHjvJmlnuPO66pUycvGOYwUox0WjxLbjHIdQ3IjKPndHbooGeHShbYPpgV2N8wP6UoW3EA6-dIu9tmxydKeuonHy9pdkWKv14Efjig6n_dR_dv21Z17bGBXlLzTZ6JnoCU82oi1NJZgqftdDbCfD_clsdhXLiDK0nCwwC84SFiKV8tV1T34J3A'
// fetch(url,{
//     method:"feow",
//     auth: 'Bearer ' + idToken
//     body,
// })