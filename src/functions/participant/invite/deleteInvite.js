const errorHandler = require('../../../middleware/errorHandler')
const DN_Team =require('../../../models/Dn-Team')
const Invite = require('../../../models/Invite')
const {NotFoundError} = require('../../../utils/error')

//change error messages

const deleteInvite = async(req,res)=>{
    try {
        const invite = await Invite.findOne({_id:req.params.inv_id})
        if(!invite){
            return errorHandler(new NotFoundError,req,res)
        }
        const check = await DN_Team.findOne({admin_id:req.participant._id,_id:invite.team_id})
        if(!check){
            return res.send(401).send('Unauthorized')
    }
        await invite.remove()
        res.send(invite)
    } catch (e) {
        res.status(400).send(e)
    }
    
}

module.exports = deleteInvite