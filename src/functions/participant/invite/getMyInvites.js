const Invite = require('../../../models/Invite')
const errorHandler = require('../../../middleware/errorHandler')
const {NotFoundError, BadRequestError} = require('../../../utils/error')
const DN_Team = require('../../../models/Dn-Team')

const myInvites = async(req,res)=>{
    try {
        const received = await Invite.find({participant_id:req.participant._id})
        if(!received || received.length==0){
            throw new NotFoundError
        }
        const teams = await DN_Team.find({admin_id:req.participant._id})
        const team_ids = teams.map((team)=>team._id)
        const sent = await Invite.find({team_id:{$in:team_ids}})
        if((!sent || sent.length==0) && (!received || received.length==0)){
            errorHandler(new NotFoundError,req,res)
            return
        }
        res.status(200).send({received,sent})
    } catch (e) {
        errorHandler(new BadRequestError,req,res)
    }
}

module.exports = myInvites