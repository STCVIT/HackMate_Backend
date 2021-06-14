const projectModel = require('../../../models/Project')

const getById = async(req,res)=>{
    try {
        const project = await projectModel.findOne({_id:req.params._id})
        res.status(200).send(project)
    } catch (e) {
        res.status(404).send('DNE')
    }
    
}

module.exports = getById