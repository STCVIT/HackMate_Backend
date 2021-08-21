const errorHandler = require('../../../middleware/errorHandler')
const Hack = require('../../../models/Hack')
const { NotFoundError, BadRequestError } = require('../../../utils/error')

async function getHack(req,res){
    try {
        const hack = await Hack.findOne({_id:req.params.id})
        if(!hack){
            return errorHandler(new NotFoundError,req,res)
        }
        res.status(200).send(hack)
    } catch (e) {
        errorHandler(new BadRequestError,req,res)
    }
}

module.exports = getHack