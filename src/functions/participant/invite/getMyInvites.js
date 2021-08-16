const Invite = require('../../../models/Invite')
const errorHandler = require('../../../middleware/errorHandler')
const {NotFoundError, BadRequestError} = require('../../../utils/error')
const DN_Team = require('../../../models/Dn-Team')
const participantModel = require('../../../models/Participant')

const myInvites = async(req,res)=>{
    try {
        const teams = await DN_Team.find({admin_id:req.participant._id})
        const team_ids = teams.map(team=>team._id)
        const sent_temp = await Invite.find({team_id:{$in:team_ids}})
        const received_temp = await Invite.find({participant_id:req.participant._id})
        let sent = []
        let received = []
        
        // for await (inv of received_temp){
        //     let team = await DN_Team.findOne({_id:inv.team_id})
        //     console.log(team)
        //     let leader = await participantModel.findById(team.admin_id)
        //     received.push({team,leader,inv})
        // }
        await Promise.all(received_temp.map(async(inv)=>{
            let team = await DN_Team.findById(inv.team_id)
            if(team==null){
                console.log(inv.team_id)
            }
            let leader = await participantModel.findById(team.admin_id)
            received.push({team,leader,inv})
        }))
        await Promise.all(sent_temp.map(async(inv)=>{
            let participant = await participantModel.findById(inv.participant_id)
            let team = await DN_Team.findById(inv.team_id)
            sent.push({inv,participant,team})
        }))
        // for (let inv of sent_temp){
        //     let participant = await participantModel.findById(inv.participant_id)
        //     let team = await DN_Team.findById(inv.team_id)
        //     sent.push({inv,participant,team})
        // }
        if((!sent || sent.length==0) && (!received || received.length==0)){
            return errorHandler(new NotFoundError,req,res)
        }
        res.status(200).send({received,sent})
    } catch (e) {
        console.log(e)
        errorHandler(new BadRequestError,req,res)
    }
}

module.exports = myInvites