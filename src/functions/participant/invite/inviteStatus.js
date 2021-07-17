const Invite = require('../../../models/Invite')
const DN_Team = require('../../../models/Dn-Team')
const Hack = require('../../../models/Hack')
const errorHandler = require('../../../middleware/errorHandler')
const {TeamFullError} = require('../../../utils/error')

const mongoose = require('mongoose')

const inviteStatus = async(req,res) =>{
    
    try {
        
        const invite = await Invite.findOne({_id:req.params.inv_id,participant_id:req.participant._id})
        if(!invite){
            return res.status(400).send('Not Found')
        }
        const team = await DN_Team.findOne({_id:invite.team_id})
        if(req.params.status=='accepted'){
            team.members.push({uid:req.participant._id})
            await team.save()
            // let check = team.check()
            // console.log(check)
            // if(check==0){
            //     await team.save()
            //     await invite.remove()
            //     res.status(201).send('added to team')
            // }else{
            //     errorHandler(check,req,res)
            // }
            
        }
        else if(req.params.status=='rejected'){
            await invite.remove()
            res.status(201).send('rejected')
        }

    } catch (e) {
        res.status(400).send(e)
    }    
}

module.exports = inviteStatus