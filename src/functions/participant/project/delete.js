const errorHandler = require('../../../middleware/errorHandler')
const projectModel = require('../../../models/Project')
const { NotFoundError, BadRequestError } = require('../../../utils/error')


const deleteProject = async(req,res)=>{
    try {
        const project = await projectModel.deleteOne({_id:req.params.project_id,participant_id:req.participant._id})
        if(project.deletedCount==0){
           return errorHandler(new NotFoundError,req,res)
        }
        res.status(200).send(project)
    } catch (e) {
       errorHandler(new BadRequestError,req,res)
    }
    
}

module.exports = deleteProject