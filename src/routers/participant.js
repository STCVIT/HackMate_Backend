const express = require('express')
const getParticipantBySkills = require('../functions/participant/participant/geBySkills')
const getAllParticipants = require('../functions/participant/participant/getAll')
const getAllNull = require('../functions/participant/participant/getAllNull')
const getAllSkills = require('../functions/participant/participant/getAllSkills')

const getById = require('../functions/participant/participant/getById')
const { checkUser, checkClaimParticipant } = require('../middleware/auth')
const { getParticipant } = require('../middleware/getUser')

const router = express.Router()

//GET-ALL-PARTICIPANTS
router.get('/all/:hack_id',checkUser,checkClaimParticipant,getParticipant,getAllParticipants)

//GET-BY-SKILLS
router.get('/skill/:hack_id',checkUser,checkClaimParticipant,getParticipant,getParticipantBySkills)

//GET-ALL-FOR-NULL-HACK
router.get('/allNull',checkUser,checkClaimParticipant,getParticipant,getAllNull)

//GET-ALL-SKILLED-FOR-NULL-HACK
router.get('/skillNull',checkUser,checkClaimParticipant,getParticipant,getAllSkills)

//GET-BY-ID
router.get('/:participant_id',checkUser,checkClaimParticipant,getParticipant,getById)

module.exports = router