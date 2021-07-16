const Invite = require('../../../models/Invite')
const DN_Team = require('../../../models/Dn-Team')
const Hack = require('../../../models/Hack')
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
        const team = await DN_Team.find({_id:invite.team_id})
        if(req.params.status=='accepted'){
            if(team.hack_id != null){
                const hack = await Hack.find({_id:team.hack_id})
                if(hack.max_team_size===team.members.length){
                    errorHandler(new TeamFullError,req,res)
                    return
                }
            }
            team.members.push({uid:req.participant._id})
            await team.save(opts)
            await invite.remove(opts)
            res.status(201).send('added to team')
        }
        else if(req.params.status=='rejected'){
            await invite.remove()
            res.status(201).send('rejected')
        }

    } catch (e) {
        res.status(400).send(e)
    }   
}) 
}

module.exports = inviteStatus