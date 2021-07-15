const {NotFoundError} = require('../../../utils/error')
const DN_Team = require('../../../models/Dn-Team')
const Participant = require('../../../models/Participant')
const errorHandler = require('../../../middleware/errorHandler')
const Skill = require('../../../models/Skill')

const getParticipantBySkills = async(req,res) => {
    try {
        const skills = await Skill.find({skill:req.params.skill})
        let skillParticipants = skills.map((skill)=>{return skill.participant_id})
        if(req.params.hack_id!='null'){
            const hackTeams = await DN_Team.find({hack_id:req.params.hack_id})
            if(!hackTeams || hackTeams.length==0){
                const participants = await Participant.find({_id:{$in:skillParticipants}})
                if(!participants || participants.length==0){
                    errorHandler(new NotFoundError,req,res)
                    return
                }       
            return res.status(200).send(participants)
            }
        else{
            let members = []
            let temp = hackTeams.map((team)=>{return team.members})
            temp.forEach(member => {
                member.forEach((doc)=>members.push(doc.uid))
            });
            let hack = new Set(members)
            let eligibleParticipants = skillParticipants.filter(sp=>!hack.has(sp))
            const answer = await Participant.find({_id:{$in:eligibleParticipants}})
            if(!answer || answer.length==0){
                errorHandler(new NotFoundError,req,res)
                return
            }    
            return res.status(200).send(answer)
        }
    }else{
          const SP =   await Participant.find({_id:{$in:skillParticipants}})
          if(!SP || SP.length==0){
            errorHandler(new NotFoundError,req,res)
            return
          }    
          return res.status(200).send(SP)
    }
} catch (e) {
        res.status(400).send(e)
}   
}

module.exports = getParticipantBySkills