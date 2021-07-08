
const createRequest = require('../functions/participant/requests/createRequest')
const myRequests = require('../functions/participant/requests/myRequests')
const { checkUser, checkClaimParticipant } = require('../middleware/auth')
const checkAdmin = require('../middleware/checkTeamAdmin')
const { getParticipant } = require('../middleware/getUser')
const router = express.Router()

const Request = require('../models/Request')
const ParticipantTeam = require('../models/ParticipantTeam') 
const Team = require('../models/Team')
const Hack = require('../models/Hack')
const { TeamFullError } = require('../utils/error')
const errorHandler = require('../middleware/errorHandler')

//check for participant in team/hack middleware addition 

//CREATE-REQUEST
router.post('/request',checkUser,checkClaimParticipant,getParticipant,createRequest)

//GET-MY-REQUESTS
router.get('/myRequests',checkUser,checkClaimParticipant,getParticipant,myRequests)

//ACCEPT-REJECT-REQUEST
router.post('/requestStatus/:status/:req_id',checkUser,checkClaimParticipant,getParticipant,checkAdmin,reqStatus)

module.exports = router


//check
const reqStatus = async(req,res) =>{
    try {
        const request = await Request.find({_id:req.params.req_id})
        const team = await Team.find({_id:request.team_id})
        const hack = await Hack.find({_id:team.hack_id})
        const participants = await ParticipantTeam.find({team_id:team._id})
        if(req.params.status=='accepted'){
            if(hack.max_team_size===participants.length){
                throw new TeamFullError
            }
            const joinTeam = new ParticipantTeam({
                team_id : request.team_id,
                participant_id : request.participant_id
            })
            await joinTeam.save()
            await request.remove()
            res.status(201).send('added to team')
        }
        else if(req.params.status=='rejected'){
            await request.remove()
            res.status(201).send('rejected')
        }

    } catch (e) {
        errorHandler(e,req,res)
    }    
}