const Hack = require('../../../models/Hack')

async function updateHack(req,res){
    const updates = Object.keys(req.body)
    const allowedUpdates=['name','website','venue','poster','prize_pool','start','end','max-team-size','min-team-size','mode_of_conduct']
    const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))
    if (!isValidOperation){
       return res.status(400).send('Invalid Updates!')
    }
    try {
         const hack = await Hack.findOne({_id:req.params.id})
         updates.forEach((update)=>hack[update]=req.body[update])
         await hack.save()
         res.send(hack)
    } catch (error) {
         res.status(400).send(error)
    }
}

module.exports = updateHack