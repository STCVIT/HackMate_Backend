const Request = require('../../../models/Request')
const DN_Team = require('../../../models/Dn-Team')
const Hack = require('../../../models/Hack')
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
            const team = await DN_Team.findOne({_id:request.team_id,admin_id:req.participant._id})
            if(!team){
                return res.status(401).send('not authorized')
            }
            if(req.params.status=='accepted'){ 
                if(team.hack_id != null){
                    const hack = await Hack.find({_id:team.hack_id})
                    if(hack.max_team_size===team.members.length){
                        errorHandler(new TeamFullError,req,res)
                        return
                    }
                }
                team.members.push({uid:request.participant_id})
                await team.save(opts)
                await request.remove(opts)
                res.status(201).send('added to team')
            }
            else if(req.params.status=='rejected'){
                await request.remove()
                res.status(201).send('rejected')
            }
    
        } catch (e) {
            res.status(400).send(e)
        }  
    })
      
}

module.exports = reqStatus