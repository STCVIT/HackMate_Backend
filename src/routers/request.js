const { response } = require('express')
const express = require('express')
const { checkUser, checkClaimParticipant } = require('../middleware/auth')
const checkAdmin = require('../middleware/checkTeamAdmin')
const { getParticipant } = require('../middleware/getUser')
const router = express.Router()

// const Team = require('../models/Team')

// const getLeaderTeams = async(req,res) =>{
//     const teams = await Team.find({admin_id:req.participant._id})
//     res.send({})
// }

// //get teams in which dude is a leader
// router.get('/getLeaderTeams',checkUser,checkClaimParticipant,getParticipant,)

router.post('/invite',checkUser,checkClaimParticipant,getParticipant,checkAdmin,)
router.post('/request',checkUser,checkClaimParticipant,getParticipant,)

router.get('/',checkUser,checkClaimParticipant,getParticipant,)
router.get('/',checkUser,checkClaimParticipant,getParticipant,)

router.post('/inviteStatus',checkUser,checkClaimParticipant,getParticipant,)
router.post('/requestStatus',checkUser,checkClaimParticipant,getParticipant,checkAdmin,)
