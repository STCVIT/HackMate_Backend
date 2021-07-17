const DN_Team = require('../../../models/Dn-Team')
const Request = require('../../../models/Request')

const createRequest = async(req,res)=>{
    try {
        const check = await DN_Team.findOne({team_id:req.params.team_id,'members.uid':req.participant._id})
        if(check){
            return res.status(400).send('Already in team')
        }
        const request = new Request({
            team_id:req.params.team_id,
            participant_id:req.participant._id
        })
        await request.save()
        res.status(201).send('Request was sent successfully!')    
    } catch (e) {
        res.status(400).send(e)
    }
}

module.exports = createRequest