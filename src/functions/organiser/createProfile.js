const Organiser = require('../../models/Organiser')
const errorHandler = require('../../middleware/errorHandler')
const {BadRequestError} = require('../../utils/error')

async function createProfile(req,res,next){
    try{
        console.log(req.userId)
        const participant = new Organiser({
            ...req.body,
            uid:req.userId,
            email:req.email
        })
        console.log(participant)
        await participant.save()
        req.participant = participant
        next()
    }
    catch(e){
        errorHandler(new BadRequestError,req,res)
    } 
}

module.exports = createProfile