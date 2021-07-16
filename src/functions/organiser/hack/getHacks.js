const Hack = require('../../../models/Hack')

async function getHacks(req,res){
    try {
        const page = Number(req.query.page)
        const start = (page-1)*6
        const limit = 6 
        const end = start + limit
        const hacks = await Hack.find({organiser_id:req.organiser._id}).sort({_id:-1})
        const newHacks = hacks.slice(start,end)
        if(!newHacks || newHacks.length==0){
            return res.send('not found')
        }
        let length
        if(hacks.length%6==0){
            length = hacks/6
        }
        else{
            length = hacks/6 + 1
        }
        res.status(200).send({newHacks,length})
    } catch (e) {
        res.status(400).send('OOF NI MILE')
    }
}

module.exports = getHacks