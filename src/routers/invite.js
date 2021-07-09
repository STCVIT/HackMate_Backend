const express = require('express')
const createInvite = require('../functions/participant/invite/createInvite')
const myInvites = require('../functions/participant/invite/getMyInvites')
const { checkUser, checkClaimParticipant } = require('../middleware/auth')
const checkAdmin = require('../middleware/checkTeamAdmin')
const { getParticipant } = require('../middleware/getUser')
const router = express.Router()
const inviteStatus = require('../functions/participant/invite/inviteStatus')

//CREATE-INVITE
router.post('/invite/:team_id/:participant_id',checkUser,checkClaimParticipant,checkAdmin,createInvite)

//GET-MY-INVITES
router.get('/myInvites',checkUser,checkClaimParticipant,getParticipant,myInvites)

//ACCEPT-REJECT-INVITE
router.post('/inviteStatus/:status/:inv_id',checkUser,checkClaimParticipant,getParticipant,inviteStatus)

module.exports = router

