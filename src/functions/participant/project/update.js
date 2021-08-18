const projectModel = require('../../../models/Project')
const errorHandler = require('../../../middleware/errorHandler')
const {NotFoundError} = require('../../../utils/error')

async function updateProject(req,res){
    const updates = Object.keys(req.body)
    const allowedUpdates=['name','description','code','design','demonstration']
    const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))
    if (!isValidOperation){
       return res.status(400).send('Invalid Updates!')
    }
    try {
        const project = await projectModel.findOne({_id:req.params.project_id,participant_id:req.participant._id})
        if(!project){
           return errorHandler(new NotFoundError,req,res)
        }
        updates.forEach((update)=>project[update]=req.body[update])
        await project.save()
        res.send(project)
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = updateProject