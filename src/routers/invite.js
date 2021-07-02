const express = require('express')
const createInvite = require('../functions/participant/invite/createInvite')
const myInvites = require('../functions/participant/invite/getMyInvites')
const { checkUser, checkClaimParticipant } = require('../middleware/auth')
const checkAdmin = require('../middleware/checkTeamAdmin')
const { getParticipant } = require('../middleware/getUser')
const Invite = require('../models/Invite')
const router = express.Router()

router.post('/invite/:team_id/:participant_id',checkUser,checkClaimParticipant,checkAdmin,createInvite)

router.get('/myInvites',checkUser,checkClaimParticipant,getParticipant,myInvites)

//router.post('/inviteStatus/:id',checkUser,checkClaimParticipant,getParticipant,)





module.exports = router