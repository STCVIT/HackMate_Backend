const Hack = require('../../../models/Hack')
const paginate = require('../../../middleware/paginate')


async function getHacks(req,res){
    try {
        const page = Number(req.query.page)
        const hacks = await Hack.find({organiser_id:req.organiser._id}).sort({_id:-1})
        
        const newHacks = paginate(hacks,6,page)
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