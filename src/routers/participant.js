const express = require('express')
const getParticipantBySkills = require('../functions/participant/participant/geBySkills')
const getAllParticipants = require('../functions/participant/participant/getAll')
const { checkUser, checkClaimParticipant } = require('../middleware/auth')
const { getParticipant } = require('../middleware/getUser')

const router = express.Router()

//GET-ALL-PARTICIPANTS
router.get('/all/:hack_id',checkUser,checkClaimParticipant,getParticipant,getAllParticipants)

//GET-BY-SKILLS
router.get('/skill/:skill/:hack_id',checkUser,checkClaimParticipant,getParticipantBySkills)

module.exports = router