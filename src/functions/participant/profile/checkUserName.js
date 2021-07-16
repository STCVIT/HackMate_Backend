const Participant = require('../../../models/Participant')
const { BadRequestError } = require('../../../utils/error')
const errorHandler = require('../../../middleware/errorHandler')

const checkUserName = async(req,res)=>{
    try {
        const user = await Participant.findOne({username:req.params.username})
        if(!user){
            res.status(200).send('ok')
        }
        else{
            res.status(403).send('no')
        }
    } catch (e) {
        errorHandler(new BadRequestError,req,res)
    }
}

module.exports = checkUserName