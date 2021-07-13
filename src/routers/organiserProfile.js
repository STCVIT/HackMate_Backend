const express = require('express')

const {checkUser,setClaimOrganiser,checkClaimOrganiser,deleteUser} = require('../middleware/auth')

const createProfile = require('../functions/organiser/profile/createProfile')
const updateProfile = require('../functions/organiser/profile/updateProfile')
const deleteProfile = require('../functions/organiser/profile/deleteProfile')
const {getOrganiser} = require('../middleware/getUser')

const router = express.Router()

//SET-CLAIM-ON-SIGNUP
router.post('/signup',setClaimOrganiser)

//CREATE-PROFILE
router.post('/createProfile',checkUser,checkClaimOrganiser,createProfile)

//LOGIN
router.get('/login',checkUser,checkClaimOrganiser,getOrganiser,(req,res)=>{
    res.status(200).send(req.organiser)
})

//UPDATE-PROFILE
router.patch('/updateProfile',checkUser,checkClaimOrganiser,getOrganiser,updateProfile)

//DELETE-PROFILE
router.delete('/deleteProfile',checkUser,checkClaimOrganiser,getOrganiser,deleteProfile,deleteUser)

module.exports = router

