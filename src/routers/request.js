const express = require('express')
const { checkUser, checkClaimParticipant } = require('../middleware/auth')
const checkAdmin = require('../middleware/checkTeamAdmin')
const { getParticipant } = require('../middleware/getUser')
const router = express.Router()


router.post('/invite',checkUser,checkClaimParticipant,getParticipant,checkAdmin,)
router.post('/request',checkUser,checkClaimParticipant,getParticipant,)
router.post('/inviteStatus',checkUser,checkClaimParticipant,getParticipant,)
router.post('/requestStatus',checkUser,checkClaimParticipant,getParticipant,checkAdmin,)
