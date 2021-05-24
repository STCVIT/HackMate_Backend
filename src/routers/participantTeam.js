const express = require('express')
const { checkUser, checkClaimParticipant } = require('../middleware/auth')
const { getParticipant } = require('../middleware/getUser')

const router = express.Router()

const createTeam = require('../functions/participant/team/createTeam')
const checkAdmin = require('../middleware/checkTeamAdmin')
const addSkills = require('../functions/participant/team/addSkills')

//CREATE-TEAM
router.post('/createTeam/:id',checkUser,checkClaimParticipant,getParticipant,createTeam)

//GET-BY-TEAM-CODE

//GET-BY-TEAM-SKILLS

//ADD-SKILL-REQUIREMENTS
router.post('/addSkills/:id',checkUser,checkClaimParticipant,getParticipant,checkAdmin,addSkills)
