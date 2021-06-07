const Hack = require('../../../models/Hack')

async function getHack(req,res){
    try {
        const hack = await Hack.findOne({_id:req.params.id})
        res.status(200).send(hack)
    } catch (e) {
        res.status(400).send('Error Vro')
    }
}

module.exports = getHack