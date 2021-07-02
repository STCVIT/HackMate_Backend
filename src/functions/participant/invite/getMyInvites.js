const Invite = require('../../../models/Invite')
const errorHandler = require('../../../middleware/errorHandler')
const {NotFoundError} = require('../../../utils/error')

const myInvites = async(req,res)=>{
    try {
        const invites = await Invite.find({participant_id:req.participant._id})
        if(!invites || invites.length==0){
            throw new NotFoundError
        }
        res.status(200).send(invites)
    } catch (e) {
        errorHandler(e,req,res)
    }
}

module.exports = myInvites