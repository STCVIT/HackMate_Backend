const Hack = require('../../../models/Hack')
const paginate = require('../../../middleware/paginate')
const errorHandler = require('../../../middleware/errorHandler')
const { NotFoundError, BadRequestError } = require('../../../utils/error')


async function getHacks(req,res){
    try {
        const page = Number(req.query.page)
        const hacks = await Hack.find({organiser_id:req.organiser._id}).sort({_id:-1})
        
        const newHacks = paginate(hacks,6,page)
        console.log(newHacks)
        if(!newHacks || newHacks.length==0){
            return errorHandler(new NotFoundError,req,res)
        }
        let length = hacks.length
        res.status(200).send({newHacks,length})
    } catch (e) {
        errorHandler(new BadRequestError,req,res)
    }
}

module.exports = getHacks