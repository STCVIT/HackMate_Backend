const errorHandler = require('../../../middleware/errorHandler')
const paginate = require('../../../middleware/paginate')
const Hack = require('../../../models/Hack')
const { NotFoundError, BadRequestError } = require('../../../utils/error')

const getUpcomingHacks = async(req,res) =>{
    try {
        const page = Number(req.query.page)
        const now = new Date(Date.now())
        const hacks = await Hack.find({start:{$gt:now}})
        
        let length = hacks.length
        const final = paginate(hacks,6,page)
        if(final.length==0){
            return errorHandler(new NotFoundError,req,res)
        }
        res.status(200).send({final,length})
    } catch (e) {
        errorHandler(new BadRequestError,req,res)
    }
}

module.exports = getUpcomingHacks