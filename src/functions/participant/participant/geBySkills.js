const {NotFoundError} = require('../../../utils/error')
const DN_Team = require('../../../models/Dn-Team')
const Participant = require('../../../models/Participant')
const errorHandler = require('../../../middleware/errorHandler')
const Skill = require('../../../models/Skill')

const getParticipantBySkills = async(req,res) => {
    try {
        let length = 0
        const skills = await Skill.find({skill:req.params.skill})
        let skillParticipants = skills.map((skill)=>{return skill.participant_id})
            const hackTeams = await DN_Team.find({hack_id:req.params.hack_id})

            if(!hackTeams || hackTeams.length==0){
                const participants = await Participant.find({_id:{$in:skillParticipants,$ne:req.participant._id}})
                if(!participants || participants.length==0){
                    errorHandler(new NotFoundError,req,res)
                    return
                }
            length = participants.length           
            const page = Number(req.query.page)
            const start = (page-1)*12
            const limit = 12
            const end = start + limit
            const final = participants.slice(start,end)
            if(!final || final.length==0){
                errorHandler(new NotFoundError,req,res)
                return
            }
            return res.status(200).send({final,length})
            }

            else{
            let members = []
            let temp = hackTeams.map((team)=>{return team.members})
            temp.forEach(member => {
                member.forEach((doc)=>members.push(doc.uid))
            });
            let hack = new Set(members)
            let eligibleParticipants = skillParticipants.filter(sp=>!hack.has(sp))
            const answer = await Participant.find({_id:{$in:eligibleParticipants,$ne:req.participant._id}})
            if(!answer || answer.length==0){
                errorHandler(new NotFoundError,req,res)
                return
            }
            const page = Number(req.query.page)
            const start = (page-1)*12
            const limit = 12
            const end = start + limit
            const final = answer.slice(start,end)
            if(!final || final.length==0){
                errorHandler(new NotFoundError,req,res)
                return
            }
            length = eligibleParticipants.length
            return res.status(200).send({final,length})
        }
   
} catch (e) {
        res.status(400).send(e)
}   
}

module.exports = getParticipantBySkills