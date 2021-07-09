const projectModel = require('../../../models/Project')


const deleteProject = async(req,res)=>{
    try {
        const project = await projectModel.deleteOne({_id:req.params.project_id})
        res.status(200).send(project)
    } catch (e) {
        res.status(404).send('DNE')
    }
    
}

module.exports = deleteProject