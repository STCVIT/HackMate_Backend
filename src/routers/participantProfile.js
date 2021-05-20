const express = require('express')

// const participantModel = require('../models/Participant')

// const errorHandler = require('../middleware/errorHandler')
// const successHandler = require('../middleware/successHandler')
const {checkUser,setClaimParticipant,checkClaimParticipant,deleteUser} = require('../middleware/auth')

const createProfile = require('../functions/participant/createProfile')
const updateProfile = require('../functions/participant/updateProfile')
const deleteProfile = require('../functions/participant/deleteProfile')

// const { NotFoundError, BadRequestError } = require('../utils/error')
// const { ResourceCreatedSuccess, ResourceDeletedSuccess } = require('../utils/success')

const router = express.Router()

const {getParticipant} = require('../middleware/getUser')


//CREATE-PROFILE
router.post('/createProfile',checkUser,createProfile,setClaimParticipant)

//LOGIN
router.get('/login',checkUser,checkClaimParticipant,getParticipant,(req,res)=>{
    res.status(200).send(req.participant)
})

//UPDATE-PROFILE
router.patch('/updateProfile',checkUser,checkClaimParticipant,getParticipant,updateProfile)

//DELETE-PROFILE
router.delete('/deleteProfile',checkUser,checkClaimParticipant,getParticipant,deleteProfile,deleteUser)

module.exports=router