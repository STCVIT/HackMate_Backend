const Invite = require('../../../models/Invite')
const errorHandler = require('../../../middleware/errorHandler')
const {NotFoundError, BadRequestError} = require('../../../utils/error')
const DN_Team = require('../../../models/Dn-Team')

const myInvites = async(req,res)=>{
    try {
        const received = await Invite.find({participant_id:req.participant._id})
        const teams = await DN_Team.find({admin_id:req.participant._id})
        console.log(teams)
        const team_ids = teams.map((team)=>team._id)
        const sent = await Invite.find({team_id:{$in:team_ids}})
        console.log(sent,received)
        if((!sent || sent.length==0) && (!received || received.length==0)){
            errorHandler(new NotFoundError,req,res)
            return
        }
        // if((!sent || sent.length==0)&&(received.length>0)){
        //     return res.status(200).send({received})
        // }
        // if((!received || received.length==0)&&(sent.length>0)){
        //     return res.status(200).send({sent})
        // }
        res.status(200).send({received,sent})
    } catch (e) {
        errorHandler(new BadRequestError,req,res)
    }
}

module.exports = myInvites