const paginate = require('../../../middleware/paginate')
const Hack = require('../../../models/Hack')

const getUpcomingHacks = async(req,res) =>{
    try {
        const page = Number(req.query.page)
        const now = new Date(Date.now())
        const hacks = await Hack.find({start:{$gt:now}})
        console.log(hacks,'hi')
        let length = hacks.length
        const newHacks = paginate(hacks,6,page)
        res.status(200).send({newHacks,length})
    } catch (e) {
        res.status(400).send(e)
    }
}

module.exports = getUpcomingHacks