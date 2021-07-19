const {NotFoundError} = require('../../../utils/error')
const DN_Team = require('../../../models/Dn-Team')
const Participant = require('../../../models/Participant')
const errorHandler = require('../../../middleware/errorHandler')
const paginate = require('../../../middleware/paginate')

const getAllParticipants = async(req,res)=>{
    try {
        const page = Number(req.query.page)
        let eligible=[]
        let length = 0
        let final = []
        let participants = []
        const hackTeams = await DN_Team.find({hack_id:req.body.hack_id})
        if(!hackTeams || hackTeams.length==0){
            participants = await Participant.find({_id:{$ne:req.participant._id}})
            console.log('hi')
            if(!participants || participants.length==0){
                return errorHandler(new NotFoundError,req,res)
            }
        }
        else{
            let members = []
            let temp = hackTeams.map((team)=>{return team.members})
            temp.forEach(member => {
                member.forEach((doc)=>members.push(doc.uid))
            });
            const participants = await Participant.find({_id:{$nin:members,$ne:req.participant._id}})
            if(participants.length==0 || !participants){
                return errorHandler(new NotFoundError,req,res)
            }
        }
        final = paginate(participants,12,page)
        if(!final || final.length==0){
            return errorHandler(new NotFoundError,req,res)
        }
        length = participants.length
        return res.status(200).send({final,length})       
    } catch (e) {
        res.send(e)
    }
}

module.exports = getAllParticipants