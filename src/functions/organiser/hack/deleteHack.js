const Hack = require('../../../models/Hack')

async function deleteHack(req,res){
    try {
        const hack = await Hack.findOne({_id:req.params.id})
        if(!hack){
            return res.status(400).send('Hack not found')
        }
        await hack.remove()
        res.status(200).send(hack)
    }catch(e) {
        res.status(400).send('Error')
    }
    
}

module.exports = deleteHack