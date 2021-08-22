const errorHandler = require("../../../middleware/errorHandler")
const DN_Team = require("../../../models/Dn-Team")
const participantModel = require("../../../models/Participant")
const Skill = require("../../../models/Skill")
const { NotFoundError, BadRequestError } = require("../../../utils/error")


const getById = async(req,res)=>{
    try {
        const team = await DN_Team.findById(req.params.team_id)
    if(!team){
        return errorHandler(new NotFoundError,req,res)
    }
    let members = team.members.map(member=>member.uid)
    const participants = await participantModel.find({_id:{$in:members}})
    let pt_skills = []
    await Promise.all(participants.map(async(participant)=>{
        const skills = await Skill.find({participant_id:participant._id})
        pt_skills.push({participant,skills})
    }))
    let final = {team,pt_skills}
    res.status(200).send(final)
    } catch (e) {
        errorHandler(new BadRequestError,req,res)
    }    
}

module.exports = getById

//OLD CODE
//let i = 0
// participants.forEach(async(participant)=>{
//     const skills = await Skill.find({participant_id:participant._id})
//     pt_skills.push({participant,skills})
//     i++
//     if(i==participants.length){
//         let final = {team,pt_skills}
//         res.status(200).send(final)
//     }
// })
