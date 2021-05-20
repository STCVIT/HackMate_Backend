const express = require('express')

const {checkUser,setClaimOrganiser,checkClaimOrganiser,deleteUser} = require('../middleware/auth')

const createProfile = require('../functions/organiser/createProfile')
const updateProfile = require('../functions/organiser/updateProfile')
const deleteProfile = require('../functions/organiser/deleteProfile')
const {getOrganiser} = require('../middleware/getUser')

const router = express.Router()

//CREATE-PROFILE
router.post('/createProfile',checkUser,createProfile,setClaimOrganiser)

//LOGIN
router.get('/login',checkUser,checkClaimOrganiser,getOrganiser,(req,res)=>{
    res.status(200).send(req.organiser)
})

//UPDATE-PROFILE
router.patch('/updateProfile',checkUser,checkClaimOrganiser,getOrganiser,updateProfile)

//DELETE-PROFILE
router.delete('/deleteProfile',checkUser,checkClaimOrganiser,getOrganiser,deleteProfile,deleteUser)

