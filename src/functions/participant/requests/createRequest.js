const errorHandler = require('../../../middleware/errorHandler')
const DN_Team = require('../../../models/Dn-Team')
const Request = require('../../../models/Request')
const { DuplicateEntryError } = require('../../../utils/error')

const createRequest = async(req,res)=>{
    try {
        const check = await DN_Team.findOne({_id:req.params.team_id,'members.uid':req.participant._id})
        console.log(check)
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
        errorHandler(new DuplicateEntryError,req,res)
    }
}

module.exports = createRequest