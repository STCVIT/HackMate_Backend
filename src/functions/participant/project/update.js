const projectModel = require('../../../models/Project')

async function updateProject(req,res){
    const updates = Object.keys(req.body)
    const allowedUpdates=['name','description','code','design','demonstration']
    const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))
    if (!isValidOperation){
       return res.status(400).send('Invalid Updates!')
    }
    try {
        const project = await projectModel.findOne({_id:req.params.project_id})
        updates.forEach((update)=>project[update]=req.body[update])
        await project.save()
        res.send(project)
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = updateProject