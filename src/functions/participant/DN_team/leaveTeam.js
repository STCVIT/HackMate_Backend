const DN_Team = require('../../../models/Dn-Team')

const leaveTeam = async(req,res)=>{
    try {
        const team = await DN_Team.findOne({team_id:req.params.team_id,'members.uid':req.participant._id})
    if(!team){
        return res.send("You're not in given team")
    }
    if(team.admin_id==req.participant._id){
        return res.send("admin cant leave team, try deleting it instead")
    }
    
    team.members.filter((member)=>{
        return member.uid != req.participant._id
    })
    await team.save()
    res.send('Left Successfully')
    } catch (e) {
        res.send(e)
    }
    
}

module.exports = leaveTeam