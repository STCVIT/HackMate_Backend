const Hack = require('../../../models/Hack')

async function deleteHack(req,res){
    try {
        const hack = await Hack.findOne({_id:req.params.hack_id,organiser_id:req.organiser._id})
        if(!hack){
            return res.status(404).send('Hack not found')
        }
        await hack.remove()
        res.status(200).send(hack)
    }catch(e) {
        res.status(400).send('Error')
    }
    
}

module.exports = deleteHack