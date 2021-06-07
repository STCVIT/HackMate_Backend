const Team = require('../../../models/Team')
const participantTeam = require('../../../models/ParticipantTeam')

const join_team_by_code = async(req,res)=>{
    try {
        const team = await Team.findOne({hack_id:req.params.id,team_code:req.body.code})
        if(!team){
            return res.status(404).send('No team found!')
        }
        const joinTeam = new participantTeam({
            participant_id:req.participant._id,
            team_id:team._id
        })
        await joinTeam.save()
        res.status(201).send(joinTeam)
        
    } catch (e) {
        res.send(e)
    }
    
}

//add try catch ehere and prev file

module.exports = join_team_by_code