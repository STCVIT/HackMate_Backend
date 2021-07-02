const express = require('express')

const router = express.Router()

const addSkills = require('../functions/participant/profile/addSkills')
const { checkUser, checkClaimParticipant } = require('../middleware/auth')
const {getParticipant} = require('../middleware/getUser')

//ADD-SKILLS 
router.post('/mySKills',checkUser,checkClaimParticipant,getParticipant,addSkills)

module.exports = router