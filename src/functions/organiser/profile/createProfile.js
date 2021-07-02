const Organiser = require('../../../models/Organiser')
const errorHandler = require('../../../middleware/errorHandler')
const {BadRequestError} = require('../../../utils/error')

async function createProfile(req,res){
    try{
        console.log(req.userId)
        const organiser = new Organiser({
            ...req.body,
            uid:req.userId,
            email:req.email
        })
        console.log(organiser)
        await organiser.save()
        res.status(201).send(organiser) 
    }
    catch(e){
        errorHandler(new BadRequestError,req,res)
    } 
}

module.exports = createProfile