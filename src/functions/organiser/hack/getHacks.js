const Hack = require('../../../models/Hack')

async function getHacks(req,res){
    try {
        await req.organiser.populate('hacks').execPopulate()
        res.status(200).send(req.organiser.hacks)
    } catch (e) {
        res.status(400).send('OOF NI MILE')
    }
}

module.exports = getHacks