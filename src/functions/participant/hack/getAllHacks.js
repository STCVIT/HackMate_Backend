const paginate = require('../../../middleware/paginate')
const Hack = require('../../../models/Hack')

const getAllHacks = async(req,res) => {
    try {
        const page = Number(req.query.page)
        const hacks = await Hack.find().sort({_id:-1}) 
        let length = hacks.length
        let final = paginate(hacks,6,page)
        res.status(200).send({final,length})
    } catch (e) {
        res.status(400).send(e)
    }   
}

module.exports = getAllHacks