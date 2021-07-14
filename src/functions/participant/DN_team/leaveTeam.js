const ParticipantTeam = require('../../../models/ParticipantTeam')
const Team = require('../../../models/Team')

const leaveTeam = async(req,res)=>{
    try {
        const participantTeam = await ParticipantTeam.findOne({team_id:req.params.team_id,participant_id:req.participant._id})
    if(!participantTeam){
        return res.send("You're not in given team")
    }
    const team = await Team.findOne({admin_id:req.participant._id,_id:req.params.team_id})
    if(team){
        return res.send("admin cant leave team, try deleting it instead")
    }
    await participantTeam.remove()
    res.send('Left Successfully')
    } catch (e) {
        res.send(e)
    }
    
}

module.exports = leaveTeam