const express = require('express')

const { checkUser, checkClaimParticipant } = require('../middleware/auth')
const { getParticipant } = require('../middleware/getUser')

const router = express.Router()

const reqStatus = require('../functions/participant/requests/requestStatus')
const deleteRequest = require('../functions/participant/requests/deleteRequest')
const createRequest = require('../functions/participant/requests/createRequest')
const myRequests = require('../functions/participant/requests/myRequests')

//CREATE-REQUEST
router.post('/request/:team_id',checkUser,checkClaimParticipant,getParticipant,createRequest)

//GET-MY-REQUESTS
router.get('/myRequests',checkUser,checkClaimParticipant,getParticipant,myRequests)

//ACCEPT-REJECT-REQUEST
router.post('/requestStatus/:status/:req_id',checkUser,checkClaimParticipant,getParticipant,reqStatus)

//DELETE-REQUEST
router.delete('/:req_id',checkUser,checkClaimParticipant,getParticipant,deleteRequest)

module.exports = router


