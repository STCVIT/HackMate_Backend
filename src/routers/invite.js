const express = require('express')

const { checkUser, checkClaimParticipant } = require('../middleware/auth')
const checkAdmin = require('../middleware/checkDN_TeamAdmin')
const { getParticipant } = require('../middleware/getUser')
const router = express.Router()

const createInvite = require('../functions/participant/invite/createInvite')
const myInvites = require('../functions/participant/invite/getMyInvites')
const inviteStatus = require('../functions/participant/invite/inviteStatus')
const deleteInvite = require('../functions/participant/invite/deleteInvite')

//CREATE-INVITE
router.post('/invite/:team_id/:participant_id',checkUser,checkClaimParticipant,getParticipant,checkAdmin,createInvite)

//GET-MY-INVITES
router.get('/myInvites',checkUser,checkClaimParticipant,getParticipant,myInvites)

//ACCEPT-REJECT-INVITE
router.post('/inviteStatus/:status/:inv_id',checkUser,checkClaimParticipant,getParticipant,inviteStatus)

//DELETE-INVITE
router.delete('/:inv_id',checkUser,checkClaimParticipant,getParticipant,deleteInvite)

module.exports = router

