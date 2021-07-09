const express = require('express')
const createInvite = require('../functions/participant/invite/createInvite')
const myInvites = require('../functions/participant/invite/getMyInvites')
const { checkUser, checkClaimParticipant } = require('../middleware/auth')
const checkAdmin = require('../middleware/checkTeamAdmin')
const { getParticipant } = require('../middleware/getUser')
const Invite = require('../models/Invite')
const router = express.Router()

//const Request = require('../models/Request')
const ParticipantTeam = require('../models/ParticipantTeam') 
const Team = require('../models/Team')
const Hack = require('../models/Hack')
const { TeamFullError } = require('../utils/error')
const errorHandler = require('../middleware/errorHandler')


const inviteStatus = async(req,res) =>{
    try {
        const invite = await Invite.find({_id:req.params.inv_id})
        const team = await Team.find({_id:invite.team_id})
        const hack = await Hack.find({_id:team.hack_id})
        const participants = await ParticipantTeam.find({team_id:team._id})
        if(req.params.status=='accepted'){
            if(hack.max_team_size===participants.length){
                throw new TeamFullError
            }
            const joinTeam = new ParticipantTeam({
                team_id : invite.team_id,
                participant_id : invite.participant_id
            })
            await joinTeam.save()
            await invite.remove()
            res.status(201).send('added to team')
        }
        else if(req.params.status=='rejected'){
            await invite.remove()
            res.status(201).send('rejected')
        }

    } catch (e) {
        errorHandler(e,req,res)
    }    
}


router.post('/invite/:team_id/:participant_id',checkUser,checkClaimParticipant,checkAdmin,createInvite)

router.get('/myInvites',checkUser,checkClaimParticipant,getParticipant,myInvites)

router.post('/inviteStatus/:status/:inv_id',checkUser,checkClaimParticipant,getParticipant,inviteStatus)

module.exports = router

