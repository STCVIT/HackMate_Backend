const participantModel = require('../../../models/Participant')
const errorHandler = require('../../../middleware/errorHandler')
const {BadRequestError} = require('../../../utils/error')

async function createProfile(req,res){
    try{
        const participant = new participantModel({
            ...req.body,
            uid:req.userId,
            email:req.email
        })
        await participant.save()
        res.status(201).send(participant) 
    }
    catch(e){
        errorHandler(new BadRequestError,req,res)
    } 
}

module.exports = createProfile