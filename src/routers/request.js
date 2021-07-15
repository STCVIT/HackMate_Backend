const express = require('express')
const createRequest = require('../functions/participant/requests/createRequest')
const myRequests = require('../functions/participant/requests/myRequests')
const { checkUser, checkClaimParticipant } = require('../middleware/auth')
const checkAdmin = require('../middleware/checkTeamAdmin')
const { getParticipant } = require('../middleware/getUser')
const router = express.Router()
const reqStatus = require('../functions/participant/requests/requestStatus')

//CREATE-REQUEST
router.post('/request',checkUser,checkClaimParticipant,getParticipant,createRequest)

//GET-MY-REQUESTS
router.get('/myRequests',checkUser,checkClaimParticipant,getParticipant,myRequests)

//ACCEPT-REJECT-REQUEST
router.post('/requestStatus/:status/:req_id',checkUser,checkClaimParticipant,getParticipant,checkAdmin,reqStatus)

//DELETE-REQUEST


module.exports = router


