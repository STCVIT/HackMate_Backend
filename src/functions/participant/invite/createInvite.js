const Invite = require('../../../models/Invite')
const ParticipantTeam = require('../../../models/ParticipantTeam')

const createInvite = async(req,res)=>{
    try {
        const check = await ParticipantTeam.findOne({team_id:req.params.team_id,participant_id:req.params.participant_id})
        if(check){
            return res.status(400).send('Already in team')
        }
        const invite = new Invite({
            team_id:req.params.team_id,
            participant_id:req.params.participant_id
        })
        await invite.save()
        res.status(201).send('Invite was sent successfully!')    
    } catch (e) {
        res.status(400).send(e)
    }
}

module.exports = createInvite