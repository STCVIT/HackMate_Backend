const Request = require('../../../models/Request')
const Team = require('../../../models/Team')
const Hack = require('../../../models/Hack')
const ParticipantTeam = require('../../../models/ParticipantTeam')
const errorHandler = require('../../../middleware/errorHandler')
const {TeamFullError} = require('../../../utils/error')

const mongoose = require('mongoose')
require('../../../db/mongoose')

const reqStatus = async(req,res) =>{
    const session = await mongoose.startSession()
    await session.withTransaction(async()=>{
        try {
            const opts = { session };
            const request = await Request.find({_id:req.params.req_id})
            const team = await Team.find({_id:request.team_id})
            const hack = await Hack.find({_id:team.hack_id})
            const participants = await ParticipantTeam.find({team_id:team._id})
            if(req.params.status=='accepted'){
                if(hack.max_team_size===participants.length){
                    throw new TeamFullError
                }
                const joinTeam = await ParticipantTeam.create([{
                    team_id : request.team_id,
                    participant_id : request.participant_id
                }],opts)
                await request.remove(opts)
                res.status(201).send('added to team')
            }
            else if(req.params.status=='rejected'){
                await request.remove()
                res.status(201).send('rejected')
            }
    
        } catch (e) {
            errorHandler(e,req,res)
        }  
    })
      
}

module.exports = reqStatus