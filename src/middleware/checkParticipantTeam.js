const ParticipantTeam = require('../models/ParticipantTeam')

const checkParticipantTeam = async(req,res,next)=>{
    const team = await ParticipantTeam.findOne({participant_id:req.participant._id,team_id:req.params.id})
    if(team){
        return res.send('Sorry bro aap team me ho!')
    }
    next()
}

module.exports = checkParticipantTeam