const errorHandler = require('../../../middleware/errorHandler')
const {NotFoundError,BadRequestError} = require('../../../utils/error')
const Invite = require('../../../models/Invite')
const Participant = require('../../../models/Participant')
const DN_Team = require('../../../models/Dn-Team')

const getMyInvite=async(req,res)=>{
    try {
        const teams = await DN_Team.find({admin_id:req.participant._id})
        const team_ids = teams.map(team=>team._id)
        const sent_temp = await Invite.find({team_id:{$in:team_ids}})
        const received_temp = await Invite.find({participant_id:req.participant._id})
        let sent = []
        let received = []
        for await (inv of received_temp){
            let team = await DN_Team.findById(inv.team_id)
            let leader = await Participant.findById(team.admin_id)
            received.push({inv,team:team.name,leader:leader.name})
        }
        console.log(received)        
    } catch (e) {
        
    }
}


module.exports = getMyInvite