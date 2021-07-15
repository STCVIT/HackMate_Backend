const errorHandler = require('../../../middleware/errorHandler')
const Skill = require('../../../models/Skill')
const { NotFoundError, BadRequestError } = require('../../../utils/error')

const getSkills = async(req,res)=>{
    try {
        const skills = await Skill.find({participant_id:req.participant._id})
        if(!skills || skills.length == 0){
        errorHandler(new NotFoundError,req,res)
        return
        }    
        res.status(200).send(skills)
    } catch (e) {
        errorHandler(new BadRequestError,req,res)
    }
    
}

module.exports = getSkills