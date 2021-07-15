const express = require('express')
const { checkUser, checkClaimParticipant } = require('../middleware/auth')
const { getParticipant } = require('../middleware/getUser')

const router = express.Router()

const createTeam = require('../functions/participant/DN_team/createTeam')
const checkAdmin = require('../middleware/checkDN_TeamAdmin')
const addSkills = require('../functions/participant/DN_team/addSkills')
const get_team_by_name = require('../functions/participant/DN_team/get_team_by_name')
const join_team_by_code = require('../functions/participant/DN_team/join_by_code')
const get_team_by_skills = require('../functions/participant/DN_team/get_team_by_skills')
const myTeams = require('../functions/participant/DN_team/getMyTeams')
const myAdminTeams = require('../functions/participant/DN_team/myAdminTeams')
const checkTeamName = require('../functions/participant/DN_team/checkTeamName')
const createNullHackTeam = require('../functions/participant/DN_team/createNullHackTeam')
const leaveTeam = require('../functions/participant/DN_team/leaveTeam')
const getSkills = require('../functions/participant/DN_team/getSkills')
const DN_Team = require('../models/Dn-Team')
const errorHandler = require('../middleware/errorHandler')
const { NotFoundError, BadRequestError } = require('../utils/error')
const removeMemberFromTeam = require('../functions/participant/DN_team/removeMemberFromTeam')
const deleteTeam = require('../functions/participant/DN_team/deleteTeam')
const updateTeam = require('../functions/participant/DN_team/updateTeam')

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

//GET-SKILLS-REQUIRED
router.get('getSkills/:team_id',checkUser,checkClaimParticipant,getSkills)

//GET-MY-TEAMS
router.get('/myTeams',checkUser,checkClaimParticipant,getParticipant,myTeams)

//GET-TEAMS-ADMIN(ME)(add from existing)
router.get('/admin/:hack_id',checkUser,checkClaimParticipant,getParticipant,myAdminTeams)

//LEAVE-TEAM
router.delete('/:team_id',checkUser,checkClaimParticipant,getParticipant,leaveTeam)

//DELETE-TEAM
router.post('/deleteTeam/:team_id',checkUser,checkClaimParticipant,getParticipant,checkAdmin,deleteTeam)

//REMOVE-MEMBER-FROM-TEAM
router.post('/removeMember/:team_id/:member_id',checkUser,checkClaimParticipant,getParticipant,checkAdmin,removeMemberFromTeam)

//UPDATE-TEAM(add from existing + projects)
router.patch('/update/:team_id',checkUser,checkClaimParticipant,getParticipant,checkAdmin,updateTeam)

module.exports = router