const {NotFoundError} = require('../../../utils/error')
const DN_Team = require('../../../models/Dn-Team')
const Participant = require('../../../models/Participant')
const errorHandler = require('../../../middleware/errorHandler')
const paginate = require('../../../middleware/paginate')
const Skill = require('../../../models/Skill')

const getAllParticipants = async(req,res)=>{
    try {
        const page = Number(req.query.page)
        let length = 0
        let participants = []
        const hackTeams = await DN_Team.find({hack_id:req.params.hack_id})
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
             participants = await Participant.find({_id:{$nin:members,$ne:req.participant._id}})
            if(participants.length==0 || !participants){
                return errorHandler(new NotFoundError,req,res)
            }
        }
        let temp_pt = paginate(participants,12,page)
        console.log(temp_pt)
        if(!temp_pt || temp_pt.length==0){
            return errorHandler(new NotFoundError,req,res)
        }
        let final = []
        for await (pt of temp_pt){
            let skills = await Skill.find({participant_id:pt._id})
            final.push({pt,skills})
        }
        length = participants.length
        return res.status(200).send({final,length})       
    } catch (e) {
        res.send(e)
    }
}

module.exports = getAllParticipants