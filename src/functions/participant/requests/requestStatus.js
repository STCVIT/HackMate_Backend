// const mongoose = require('mongoose')
// require('../../../db/mongoose')
const Request = require('../../../models/Request')
const DN_Team = require('../../../models/Dn-Team')
// const Hack = require('../../../models/Hack')
const errorHandler = require('../../../middleware/errorHandler')
const teamCheck = require('../../../middleware/teamCheck')
// const {TeamFullError} = require('../../../utils/error')


const reqStatus = async(req,res) =>{
        try {
            const request = await Request.findOne({_id:req.params.req_id})
            const team = await DN_Team.findOne({_id:request.team_id,admin_id:req.participant._id})
            if(!team){
                return res.status(401).send('not authorized')
            }
            // console.log(team)
            if(req.params.status=='accepted'){ 
                team.members.push({uid:request.participant_id})
                await team.save()
                // let check = await team.check()
                // console.log(check)
                // if(check==true){
                //     await team.save()
                //     await request.remove()
                //     res.status(201).send('added to team')
                // }
                // else{
                //     errorHandler(check,req,res)
                // }
            }
            else if(req.params.status=='rejected'){
                await request.remove()
                res.status(201).send('rejected')
            }
    
        } catch (e) {
            res.status(400).send(e)
        } 
}

module.exports = reqStatus