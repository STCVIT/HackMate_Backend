const Hack = require('../../../models/Hack')

const getUpcomingHacks = (req,res) =>{
    try {
        const now = new Date(Date.now())
        const hacks = await Hack.find()
        const eligibleHacks = hacks.filter((hack)=>{
        if (hack.start>now){
            return hack
        }
    })
        res.status(200).send(eligibleHacks)
    } catch (e) {
        res.status(400).send(e)
    }
}

module.exports = getUpcomingHacks