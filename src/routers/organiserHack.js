const express = require('express')

const { checkUser, checkClaimOrganiser } = require('../middleware/auth')
const { getOrganiser } = require('../middleware/getUser')

const createHack = require('../functions/organiser/hack/createHack')
const getHacks = require('../functions/organiser/hack/getHacks')
const getHack = require('../functions/organiser/hack/getHack') 
const updateHack = require('../functions/organiser/hack/updateHack')
const deleteHack = require('../functions/organiser/hack/deleteHack')
const getInterestedTeams = require('../functions/organiser/hack/getInterestedTeams')

const router = express.Router()

//CREATE-HACK
router.post('/createHack',checkUser,checkClaimOrganiser,getOrganiser,createHack)

//GET-HACK
router.get('/hack/:hack_id',checkUser,checkClaimOrganiser,getOrganiser,getHack)

//GET-HACKS
router.get('/hacks',checkUser,checkClaimOrganiser,getOrganiser,getHacks)

//UPDATE-HACK
router.patch('/updateHack/:hack_id',checkUser,checkClaimOrganiser,updateHack)

//DELETE-HACK
router.delete('/deleteHack/:hack_id',checkUser,checkClaimOrganiser,getOrganiser,deleteHack)

//GET-INTERESTED-TEAMS
router.get('/getTeams/:hack_id',checkUser,checkClaimOrganiser,getOrganiser,getInterestedTeams)

module.exports = router