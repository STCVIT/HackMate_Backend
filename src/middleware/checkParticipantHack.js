const ParticipantTeam = require('../models/ParticipantTeam')
const Team = require('../models/Team')

const checkParticipantHack = async(req,res,next)=>{
    const myTeams = await ParticipantTeam.find({participant_id:req.participant._id})
    myTeams.forEach(async(team)=>{
        const checkTeam = await Team.findOne({_id:team.team_id})
        if(checkTeam.hack_id==req.params.hack_id){
            return res.status(404).send('Ni bhai tum is hack me jaare ho already!')
        } 
    })
    next()
    
}

module.exports = checkParticipantHack