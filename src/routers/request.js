
const { checkUser, checkClaimParticipant } = require('../middleware/auth')
const checkAdmin = require('../middleware/checkTeamAdmin')
const { getParticipant } = require('../middleware/getUser')
const router = express.Router()

const Invite = require('../models/Invite')
const Request = require('../models/Request')


router.post('/request',checkUser,checkClaimParticipant,getParticipant,)


router.get('/myRequests',checkUser,checkClaimParticipant,getParticipant,)

router.post('/requestStatus',checkUser,checkClaimParticipant,getParticipant,checkAdmin,)
