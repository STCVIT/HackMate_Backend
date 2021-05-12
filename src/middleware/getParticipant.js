const participantModel = require('../models/Participant')

const getUser = (async (req,res,next)=>{
    const participant = await participantModel.findOne({uid:req.userId})
    req.participant = participant
    next()
})

module.exports=getUser