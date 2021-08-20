const errorHandler = require('../../../middleware/errorHandler')
const Hack = require('../../../models/Hack')
const { NotFoundError, BadRequestError } = require('../../../utils/error')

async function getHack(req,res){
    try {
        let hid = req.params.hack_id
        if(!hid || hid==( null || undefined)){
            return res.send('Send a Hack ID')
        }
        const hack = await Hack.findOne({_id:hid,organiser_id:req.organiser._id})
        if(!hack){
            return errorHandler(new NotFoundError,req,res)
        }
        res.status(200).send(hack)
    } catch (e) {
        errorHandler(new BadRequestError,req,res)
    }
}

module.exports = getHack