const paginate = require('../../../middleware/paginate')
const Participant = require('../../../models/Participant')
const errorHandler = require('../../../middleware/errorHandler')
const {NotFoundError,BadRequestError} = require('../../../utils/error')
const Skill = require('../../../models/Skill')

const getAllNull = async(req,res)=>{
   try {
    let length = 0
    const participants = await Participant.find({_id:{$ne:req.participant._id}})
    if(!participants || participants.length==0){
        return errorHandler(new NotFoundError,req,res)
    }
    const page = Number(req.query.page)
    const temp = paginate(participants,12,page)
    if(temp.length==0){
        return errorHandler(new NotFoundError,req,res)
        
    }
    let final = []
    for await (pt of temp){
        let skills = await Skill.find({participant_id:pt._id})
        final.push({pt,skills})
    }
    length = participants.length
    return res.status(200).send({final,length})
   } catch (e) {
       res.send(e)
   }     
}

module.exports = getAllNull