const paginate = require('../../../middleware/paginate')
const Participant = require('../../../models/Participant')
const errorHandler = require('../../../middleware/errorHandler')
const {NotFoundError,BadRequestError} = require('../../../utils/error')

const getAllNull = async(req,res)=>{
   try {
    let length = 0
    const participants = await Participant.find({_id:{$ne:req.participant._id}})
    if(!participants || participants.length==0){
        return errorHandler(new NotFoundError,req,res)
    }
    const page = Number(req.query.page)
    const final = paginate(participants,12,page)
    if(final.length==0){
        return errorHandler(new NotFoundError,req,res)
        
    }
    length = participants.length
    return res.status(200).send({final,length})
   } catch (e) {
       res.send(e)
   }     
}

module.exports = getAllNull