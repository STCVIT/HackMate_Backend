const express = require('express')
const { checkUser, checkClaimParticipant } = require('../middleware/auth')
const { getParticipant } = require('../middleware/getUser')

const router = express.Router()

const createTeam = require('../functions/participant/team/createTeam')
const checkAdmin = require('../middleware/checkTeamAdmin')
const addSkills = require('../functions/participant/team/addSkills')
const get_team_by_name = require('../functions/participant/team/get_team_by_name')
const join_team_by_code = require('../functions/participant/team/join_by_code')
const get_team_by_skills = require('../functions/participant/team/get_team_by_skills')
const checkParticipantHack = require('../middleware/checkParticipantHack')

//CREATE-TEAM
router.post('/createTeam/:hack_id',checkUser,checkClaimParticipant,getParticipant,checkParticipantHack,createTeam)

//GET-BY-TEAM-NAME
router.get('/teamName/:id',checkUser,checkClaimParticipant,getParticipant,get_team_by_name)

//JOIN-BY-TEAM-CODE
router.post('/code/:id',checkUser,checkClaimParticipant,getParticipant,join_team_by_code)

//GET-BY-TEAM-SKILLS
router.get('/teamSkills/:id',checkUser,checkClaimParticipant,getParticipant,get_team_by_skills)

//ADD-SKILL-REQUIREMENTS
router.post('/addSkills/:id',checkUser,checkClaimParticipant,getParticipant,checkAdmin,addSkills)

//team add/update/delete projects
//add from existing

module.exports = router
