const DN_Team = require('../../../models/Dn-Team')
const Participant = require('../../../models/Participant')
const errorHandler = require('../../../middleware/errorHandler')
const {NotFoundError,BadRequestError} = require('../../../utils/error')

const getAllSkills = async(req,res)=>{
    try {
        let length = 0
        let skill = [...req.query.skill]
        const skills = await Skill.find({skill:{$in:skill}})
        let skillParticipants = skills.map((skill)=>{return skill.participant_id})
    
                const participants = await Participant.find({_id:{$in:skillParticipants,$ne:req.participant._id}})
                if(!participants || participants.length==0){
                    errorHandler(new NotFoundError,req,res)
                    return
                }       
                const page = Number(req.query.page)
                const start = (page-1)*12
                const limit = 12
                const end = start + limit
                const final = participants.slice(start,end)
                if(!final || final.length==0){
                    errorHandler(new NotFoundError,req,res)
                    return
                }
                length = participants.length
                return res.status(200).send({final,length})
            
    } catch (e) {
        errorHandler(new BadRequestError,req,res)
    }
}

    module.exports = getAllSkills
    
        
