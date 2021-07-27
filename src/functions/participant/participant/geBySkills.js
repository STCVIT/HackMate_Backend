const {NotFoundError} = require('../../../utils/error')
const DN_Team = require('../../../models/Dn-Team')
const Participant = require('../../../models/Participant')
const errorHandler = require('../../../middleware/errorHandler')
const Skill = require('../../../models/Skill')
const paginate = require('../../../middleware/paginate')

const getParticipantBySkills = async(req,res) => {
    try {
        let temp_pt = []
        let participants = []
        let length = 0
        const page = Number(req.query.page)
        const skill = req.query.skill
        const skills = await Skill.find({skill:{$in:skill}})
        let skillParticipants = skills.map((skill)=>{return skill.participant_id})
            const hackTeams = await DN_Team.find({hack_id:req.params.hack_id})

            if(!hackTeams || hackTeams.length==0){
                 participants = await Participant.find({_id:{$in:skillParticipants,$ne:req.participant._id}})
                if(!participants || participants.length==0){
                    return errorHandler(new NotFoundError,req,res)
                 }
            length = participants.length           
            temp_pt = paginate(participants,12,page)
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
                return errorHandler(new NotFoundError,req,res)
                
            }
            temp_pt = paginate(answer,12,page)
        }
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
        res.status(400).send(e)
}   
}

module.exports = getParticipantBySkills