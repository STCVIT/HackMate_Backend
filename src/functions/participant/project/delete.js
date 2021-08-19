const errorHandler = require('../../../middleware/errorHandler')
const projectModel = require('../../../models/Project')
const { NotFoundError, BadRequestError } = require('../../../utils/error')


const deleteProject = async(req,res)=>{
    try {
        const project = await projectModel.findOne({_id:req.params.project_id,participant_id:req.participant._id})
        if(!project){
           return errorHandler(new NotFoundError,req,res)
        }
        await project.remove()
        res.status(200).send(project)
    } catch (e) {
       errorHandler(new BadRequestError,req,res)
    }
    
}

module.exports = deleteProject