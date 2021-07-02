const Request = require('../../../models/Request')

const createRequest = async(req,res)=>{
    try {
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