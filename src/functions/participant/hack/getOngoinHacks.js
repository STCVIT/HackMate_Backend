const paginate = require('../../../middleware/paginate')
const Hack = require('../../../models/Hack')

const getOngoingHacks = async(req,res) => {
    try {
        const page = Number(req.query.page)
        const now = new Date(Date.now())
        const hacks = await Hack.find({start:{$lte:now},end:{$gt:now}})
       const final = paginate(hacks,6,page)
       let length = hacks.length
       if(final.length==0){
           return res.status(404).send('not found')
       }
        res.status(200).send({final,length})
    } catch (e) {
        res.status(400).send(e)
    }
}

module.exports = getOngoingHacks