const Invite = require('../../../models/Invite')
const Team = require('../../../models/Team')
const Hack = require('../../../models/Hack')
const ParticipantTeam = require('../../../models/ParticipantTeam')
const errorHandler = require('../../../middleware/errorHandler')
const {TeamFullError} = require('../../../utils/error')

const mongoose = require('mongoose')
require('../../../db/mongoose')

const inviteStatus = async(req,res) =>{
    const session = await mongoose.startSession()
    await session.withTransaction(async()=>{
    try {
        const opts = { session };
        const invite = await Invite.find({_id:req.params.inv_id})
        if(req.participant._id != invite.participant_id){
            return res.status(400).send('Invite not for you')
        }
        const team = await Team.find({_id:invite.team_id})
        const hack = await Hack.find({_id:team.hack_id})
        const participants = await ParticipantTeam.find({team_id:team._id})
        if(req.params.status=='accepted'){
            if(hack.max_team_size===participants.length){
                throw new TeamFullError
            }
            const joinTeam = await ParticipantTeam.create([{
                team_id : invite.team_id,
                participant_id : invite.participant_id
            }],opts)
            await invite.remove(opts)
            res.status(201).send('added to team')
        }
        else if(req.params.status=='rejected'){
            await invite.remove()
            res.status(201).send('rejected')
        }

    } catch (e) {
        errorHandler(e,req,res)
    }   
}) 
}

module.exports = inviteStatus