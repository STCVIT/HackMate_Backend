
const createRequest = require('../functions/participant/requests/createRequest')
const myRequests = require('../functions/participant/requests/myRequests')
const { checkUser, checkClaimParticipant } = require('../middleware/auth')
const checkAdmin = require('../middleware/checkTeamAdmin')
const { getParticipant } = require('../middleware/getUser')
const router = express.Router()

const Request = require('../models/Request')

//check for participant in team/hack middleware addition 

//CREATE-REQUEST
router.post('/request',checkUser,checkClaimParticipant,getParticipant,createRequest)

//GET-MY-REQUESTS
router.get('/myRequests',checkUser,checkClaimParticipant,getParticipant,myRequests)

//ACCEPT-REJECT-REQUEST
router.post('/requestStatus',checkUser,checkClaimParticipant,getParticipant,checkAdmin,)
