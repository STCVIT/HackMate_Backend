async function updateProfile(req,res){
    const updates = Object.keys(req.body)
    const allowedUpdates=['name','website','college','phone','logo']
    const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))
    if (!isValidOperation){
       return res.status(400).send('Invalid Updates!')
    }
    try {
         updates.forEach((update)=>req.organiser[update]=req.body[update])
         await req.organiser.save()
    
          res.send(req.organiser)
    } catch (error) {
        res.status(400).send(error)
    }
}
    
module.exports = updateProfile