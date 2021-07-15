const express = require('express')
const router = express.Router()

const {checkUser,checkClaimParticipant} = require('../middleware/auth')
const {getParticipant} = require('../middleware/getUser')

const postReview = require('../functions/participant/review/postReview')

//ask for update and already existing
//POST-REVIEW
router.post('/postReview/:team_id/:for_id',checkUser,checkClaimParticipant,getParticipant,postReview)

module.exports = router

