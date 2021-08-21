const errorHandler = require('../../../middleware/errorHandler')
const projectModel = require('../../../models/Project')
const { BadRequestError } = require('../../../utils/error')

const createProject = async(req,res)=>{
    try {
        const project = new projectModel({
            ...req.body,
            participant_id:req.participant._id
        })
        await project.save()
        res.status(201).send(project)
    } catch (e) {
        errorHandler(new BadRequestError,req,res)
        //res.status(400).send('Error')
    } 
}

module.exports = createProject