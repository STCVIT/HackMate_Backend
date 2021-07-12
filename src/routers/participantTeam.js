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
const myTeams = require('../functions/participant/team/getMyTeams')
const myAdminTeams = require('../functions/participant/team/myAdminTeams')
const checkTeamName = require('../functions/participant/team/checkTeamName')
const createNullHackTeam = require('../functions/participant/team/createNullHackTeam')
const leaveTeam = require('../functions/participant/team/leaveTeam')

//create/join/req/invite=>(check hack)

//check
//CHECK-TEAM-NAME
router.post('/checkName',checkUser,checkClaimParticipant,checkTeamName)

//CREATE-TEAM
router.post('/createTeam/:hack_id',checkUser,checkClaimParticipant,getParticipant,createTeam)

//CREATE TEAM WITH NO HACK
router.post('/createNull',checkUser,checkClaimParticipant,getParticipant,createNullHackTeam)

//GET-BY-TEAM-NAME
router.get('/teamName/:hack_id',checkUser,checkClaimParticipant,getParticipant,get_team_by_name)

//JOIN-BY-TEAM-CODE
router.post('/code/:hack_id',checkUser,checkClaimParticipant,getParticipant,join_team_by_code)

//GET-BY-TEAM-SKILLS
router.get('/teamSkills/:hack_id',checkUser,checkClaimParticipant,getParticipant,get_team_by_skills)

//ADD-SKILL-REQUIREMENTS
router.post('/addSkills/:team_id',checkUser,checkClaimParticipant,getParticipant,checkAdmin,addSkills)

//GET-MY-TEAMS
router.get('/myTeams',checkUser,checkClaimParticipant,getParticipant,myTeams)

//GET-TEAMS-ADMIN(ME)
router.get('/admin',checkUser,checkClaimParticipant,getParticipant,myAdminTeams)

//LEAVE-TEAM
router.delete('/:team_id',checkUser,checkClaimParticipant,getParticipant,leaveTeam)

//leave team and delete team and update(add projects)

module.exports = router
