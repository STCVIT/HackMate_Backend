const DN_Team = require('../../../models/Dn-Team')
const Participant = require('../../../models/Participant')
const errorHandler = require('../../../middleware/errorHandler')
const {NotFoundError,BadRequestError} = require('../../../utils/error')
const Skill = require('../../../models/Skill')
const paginate = require('../../../middleware/paginate')

const getAllSkills = async(req,res)=>{
    try {
        let length = 0
        let skill = req.query.skill
        console.log(skill)
        const skills = await Skill.find({skill:{$in:skill}})
        console.log(skills)
        let skillParticipants = skills.map((skill)=>{return skill.participant_id})
        const participants = await Participant.find({_id:{$in:skillParticipants,$ne:req.participant._id}})
        if(!participants || participants.length==0){
            return errorHandler(new NotFoundError,req,res)
        }       
        const page = Number(req.query.page)
        const final = paginate(participants,12,page)
        if(!final || final.length==0){
            return errorHandler(new NotFoundError,req,res)
        }
        length = participants.length
        return res.status(200).send({final,length})
            
    } catch (e) {
        errorHandler(new BadRequestError,req,res)
    }
}

module.exports = getAllSkills
    
        
