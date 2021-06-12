const Hack = require('../../../models/Hack')

const getAllHacks = (req,res) => {
    try {
        const hacks = await Hack.find()
        res.status(200).send(hacks)
    } catch (e) {
        res.status(400).send(e)
    }
    
}

module.exports = getAllHacks