const Request = require('../../../models/Request')
const errorHandler = require('../../../middleware/errorHandler')
const {NotFoundError, BadRequestError} = require('../../../utils/error')
const DN_Team = require('../../../models/Dn-Team')
const participantModel = require('../../../models/Participant')

//check
const myRequests = async(req,res)=>{
    try {
        const teams = await DN_Team.find({admin_id:req.participant._id})
        const team_ids = teams.map((team)=>team._id)
        const received_temp = await Request.find({team_id:{$in:team_ids}})
        const sent_temp = await Request.find({participant_id:req.participant._id})
        let received = []
        let sent = []
        if(!received_temp && !sent_temp){
            return errorHandler(new NotFoundError,req,res)
        }
        if(received_temp){
        await Promise.all(received_temp.map(async(req)=>{
            let participant = await participantModel.findById(req.participant_id)
            let team = await DN_Team.findById(req.team_id)
            let pt = {
                name:participant.name,
                photo:participant.photo
            }
            received.push({req:req._id,participant:pt,team:team.name})
        }))
    }
    if(sent_temp){
        await Promise.all(sent_temp.map(async(req)=>{
            let team = await DN_Team.findById(req.team_id)
            let leader = await participantModel.findById(team.admin_id)
            let temp = {
                name:leader.name,
                photo:leader.photo
            }
            sent.push({req:req._id,leader:temp,team:team.name})
        }))
    }
        
        if((!sent || sent.length==0) && (!received || received.length==0)){
            return errorHandler(new NotFoundError,req,res)    
        }
        res.status(200).send({received,sent})
    } catch (e) {
        errorHandler(new BadRequestError,req,res)
    }
}

module.exports = myRequests

// for await (req of received_temp){
    //     let participant = await participantModel.findById(req.participant_id)
    //     let team = await DN_Team.findById(req.team_id)
    //     received.push({req,participant,team})
// }

// for await (req of sent_temp){
        //     let team = await DN_Team.findById(req.team_id)
        //     sent.push({req,team})
// }