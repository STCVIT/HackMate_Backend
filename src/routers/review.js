const express = require('express')
const router = express.Router()

const reviewModel = require('../models/Review')
const ParticipantTeam = require('../models/ParticipantTeam')
const {checkUser,checkClaimParticipant} = require('../middleware/auth')
const {getParticipant} = require('../middleware/getUser')

const postReview = require('../functions/participant/review/postReview')

//POST-REVIEW
router.post('/postReview/:team_id/:for_id',checkUser,checkClaimParticipant,getParticipant,postReview)

module.exports = router
