const Hack = require('../../../models/Hack')

const getUpcomingHacks = async(req,res) =>{
    try {
        const page = Number(req.query.page)
        const start = (page-1)*6
        const limit = 6 
        const end = start + limit
        const now = new Date(Date.now())
        const hacks = await Hack.find()
        const eligibleHacks = hacks.filter((hack)=>{
        if (hack.start>now){
            return hack
        }
    })
        const newHacks = eligibleHacks.slice(start,end)
        res.status(200).send(newHacks)
    } catch (e) {
        res.status(400).send(e)
    }
}

module.exports = getUpcomingHacks