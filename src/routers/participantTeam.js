const express = require('express')
const { checkUser, checkClaimParticipant } = require('../middleware/auth')
const { getParticipant } = require('../middleware/getUser')

const router = express.Router()

const createTeam = require('../functions/participant/team/createTeam')
const checkAdmin = require('../middleware/checkTeamAdmin')
const addSkills = require('../functions/participant/team/addSkills')

//CREATE-TEAM
router.post('/createTeam/:id',checkUser,checkClaimParticipant,getParticipant,createTeam)

//GET-BY-TEAM-NAME
router.get('/teamName',checkUser,checkClaimParticipant,getParticipant,)

//JOIN-BY-TEAM-CODE
router.post('/code/:code',checkUser,checkClaimParticipant,getParticipant,)

//GET-BY-TEAM-SKILLS
router.get('/teamSkills',checkUser,checkClaimParticipant,getParticipant,)

//ADD-SKILL-REQUIREMENTS
router.post('/addSkills/:id',checkUser,checkClaimParticipant,getParticipant,checkAdmin,addSkills)

//ask for skills, delete and make new or check and add/delete accordingly

// router.post()//invite
// router.post()//request
// router.post()//accept/reject invite => participant
// router.post()//accept/reject request => leader

//team add/update/delete projects
//add from existing

module.exports = router
