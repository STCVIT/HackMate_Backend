const Participant = require('../../../models/Participant')

const getAllNull = async(req,res)=>{
   try {
    let length = 0
    const participants = await Participant.find({_id:{$ne:req.participant._id}})
    if(!participants || participants.length==0){
        throw new NotFoundError
    }
    const page = Number(req.query.page)
    const start = (page-1)*12
    const limit = 12
    const end = start + limit
    const final = participants.slice(start,end)
    if(!final || final.length==0){
        errorHandler(new NotFoundError,req,res)
        return
    }
    length = participants.length
    return res.status(200).send({final,length})
   } catch (e) {
       res.send(e)
   }     
}

module.exports = getAllNull