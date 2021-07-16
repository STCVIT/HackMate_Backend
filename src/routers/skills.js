const express = require('express')

const router = express.Router()
const addSkills = require('../functions/participant/skills/addSkills')
const getSkills = require('../functions/participant/skills/getSkills')

const { checkUser, checkClaimParticipant } = require('../middleware/auth')
const {getParticipant} = require('../middleware/getUser')

//ADD-SKILLS 
router.post('/mySkills',checkUser,checkClaimParticipant,getParticipant,addSkills)

//GET-SKILLS
router.get('/mySkills',checkUser,checkClaimParticipant,getParticipant,getSkills)

module.exports = router