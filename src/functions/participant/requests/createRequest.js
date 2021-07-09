const ParticipantTeam = require('../../../models/ParticipantTeam')
const Request = require('../../../models/Request')

const createRequest = async(req,res)=>{
    try {
        const check = await ParticipantTeam.findOne({team_id:req.params.team_id,participant_id:req.params.participant_id})
        if(check){
            return res.status(400).send('Already in team')
        }
        const request = new Request({
            team_id:req.params.team_id,
            participant_id:req.params.participant_id
        })
        await request.save()
        res.status(201).send('Request was sent successfully!')    
    } catch (e) {
        res.status(400).send(e)
    }
}

module.exports = createRequest