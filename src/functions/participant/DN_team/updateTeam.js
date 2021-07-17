//team.check()

const updateTeam = async(req,res)=>{
    const team = req.team
        const updates = Object.keys(req.body)
        const allowedUpdates=['code','design','demonstration','hack_id','project_description','project_name']
        const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))
        if (!isValidOperation){
            return res.status(400).send('Invalid Updates!')
        }   
    try {
        updates.forEach((update)=>team[update]=req.body[update])
        await team.save()
        res.send(team)
    } catch (error) {
    res.status(400).send(error)
}
}

module.exports = updateTeam