const errorHandler = require('../../../middleware/errorHandler')
const Participant = require('../../../models/Participant')
const Skill = require('../../../models/Skill')
const { NotFoundError } = require('../../../utils/error')

const getById = async(req,res)=>{
    try {
        const participant = await Participant.findById(req.params.participant_id)
        if(!participant){
            return errorHandler(new NotFoundError,req,res)
        }
        let skills = await Skill.find({participant_id:participant._id})
        res.status(200).send({participant,skills})
    } catch (e) {
        res.send(e)
    }
    
}

module.exports = getById