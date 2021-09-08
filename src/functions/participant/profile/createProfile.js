const participantModel = require('../../../models/Participant')
const errorHandler = require('../../../middleware/errorHandler')
const {BadRequestError, SchemaValidationError} = require('../../../utils/error')

async function createProfile(req,res){
    try{
        console.log('hi')
        const participant = new participantModel({
            ...req.body,
            uid:req.userId,
            email:req.email
        })
        await participant.save()
        res.status(201).send(participant) 
    }
    catch(e){
        console.log(e)
        // if(e.code===11000){
        //     errorHandler(new SchemaValidationError,req,res)
        // }
        errorHandler(new BadRequestError,req,res)
    } 
}

module.exports = createProfile