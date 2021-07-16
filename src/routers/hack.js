const express = require('express')

const getAllHacks = require('../functions/participant/hack/getAllHacks')
const gethackById = require('../functions/participant/hack/getHackById')
const getOngoingHacks = require('../functions/participant/hack/getOngoinHacks')
const getPopularHack = require('../functions/participant/hack/getPopularHack')
const getUpcomingHacks = require('../functions/participant/hack/getUpcomingHacks')
const { checkUser, checkClaimParticipant } = require('../middleware/auth')

const router = express.Router()

//add (not found)

//GET HACK BY POPULARITY
router.get('/popularity',checkUser,checkClaimParticipant,getPopularHack)

//GET ONGOING HACKS
router.get('/ongoing',checkUser,checkClaimParticipant,getOngoingHacks)

//GET ALL HACKS
router.get('/all',checkUser,checkClaimParticipant,getAllHacks)

//GET UPCOMING HACKS
router.get('/upcoming',checkUser,checkClaimParticipant,getUpcomingHacks)

//GET HACK BY ID
router.get('/:id',checkUser,checkClaimParticipant,gethackById)

module.exports = router