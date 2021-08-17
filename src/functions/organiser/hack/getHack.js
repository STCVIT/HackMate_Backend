const Hack = require('../../../models/Hack')

async function getHack(req,res){
    try {
        let hid = req.params.hack_id
        if(!hid || hid==( null || undefined)){
            return res.send('Send a Hack ID')
        }
        const hack = await Hack.findOne({_id:hid,organiser_id:req.organiser._id})
        if(!hack){
            return res.status(404).send('Not found')
        }
        res.status(200).send(hack)
    } catch (e) {
        res.status(400).send('Error Vro')
    }
}

module.exports = getHack