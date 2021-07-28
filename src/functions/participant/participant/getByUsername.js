const errorHandler = require("../../../middleware/errorHandler")
const paginate = require("../../../middleware/paginate")
const participantModel = require("../../../models/Participant")
const Skill = require("../../../models/Skill")
const { NotFoundError, BadRequestError } = require("../../../utils/error")

const getByUsername = async(req,res)=>{
    try {
        let userName = req.query.name
        if(!req.query.name || userName==''){
            return errorHandler(new NotFoundError,req,res)
        }
        const participants = await participantModel.find({username:{$regex:userName,$options:'i'}})
        if(!participants || participants.length==0){
            return errorHandler(new NotFoundError,req,res)
        }
        let length = participants.length
        let temp = paginate(participants,12,Number(req.query.page))
        let final = []
        for await (pt of temp){
            const skills = await Skill.find({participant_id:pt._id})
            final.push({participant:pt,skills})
        }
        res.status(200).send({final,length})
    } catch (e) {
        errorHandler(new BadRequestError,req,res)
    }
    
}


module.exports = getByUsername