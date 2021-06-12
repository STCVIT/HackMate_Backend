const express = require('express')
const getPopularHack = require('../functions/participant/hack/getPopularHack')
const { checkUser, checkClaimParticipant } = require('../middleware/auth')
const router = express.Router()

const Hack = require('../models/Hack')
const Team = require('../models/Team')

//GET HACK BY POPULARITY
router.get('/popularity',checkUser,checkClaimParticipant,getPopularHack)

