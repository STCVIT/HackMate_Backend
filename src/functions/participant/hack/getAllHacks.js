const Hack = require('../../../models/Hack')

const getAllHacks = async(req,res) => {
    try {
        const page = Number(req.query.page)
        const start = (page-1)*6
        const limit = 6 
        const end = start + limit
        const hacks = await Hack.find() 
        const newHacks = hacks.slice(start,end)
        res.status(200).send(newHacks)
    } catch (e) {
        res.status(400).send(e)
    }   
}

module.exports = getAllHacks