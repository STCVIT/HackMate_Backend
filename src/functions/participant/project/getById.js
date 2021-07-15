const errorHandler = require('../../../middleware/errorHandler')
const projectModel = require('../../../models/Project')
const { NotFoundError } = require('../../../utils/error')

const getById = async(req,res)=>{
    try {
        const project = await projectModel.findOne({_id:req.params.project_id})
        if(!project){
            errorHandler(new NotFoundError,req,res)
            return
        }
        res.status(200).send(project)
    } catch (e) {
        res.status(400).send('error')
    }
    
}

module.exports = getById