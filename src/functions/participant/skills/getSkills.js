const errorHandler = require('../../../middleware/errorHandler')
const Skill = require('../../../models/Skill')
const { NotFoundError, BadRequestError } = require('../../../utils/error')

const getSkills = async(req,res)=>{
    try {
        let skills = []
        if(req.query.participant_id){
            skills = await Skill.find({participant_id:req.query.participant_id})
        }
        else{
            skills = await Skill.find({participant_id:req.participant._id})
        }
        if(!skills || skills.length == 0){
            return errorHandler(new NotFoundError,req,res)
        }    
        res.status(200).send(skills)
    } catch (e) {
        errorHandler(new BadRequestError,req,res)
    }
    
}

module.exports = getSkills