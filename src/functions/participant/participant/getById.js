const errorHandler = require('../../../middleware/errorHandler')
const Participant = require('../../../models/Participant')
const { NotFoundError } = require('../../../utils/error')

const getById = async(req,res)=>{
    try {
        const participant = await Participant.findById(req.params.participant_id)
        if(!participant){
            return errorHandler(new NotFoundError,req,res)
        }
        res.status(200).send(participant)
    } catch (e) {
        res.send(e)
    }
    
}

module.exports = getById