const Hack = require('../../../models/Hack')

async function createHack(req,res){
    try {
        const hack = new Hack({
            ...req.body,
            organiser_id:req.organiser._id
        })
        await hack.save()
        res.status(201).send(hack)
    } catch (e) {
        res.status(400).send('Couldnt create hack')
    }
}

module.exports = createHack