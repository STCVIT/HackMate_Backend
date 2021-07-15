const errorHandler = require('../../../middleware/errorHandler')
const SkillVacancy = require('../../../models/SkillVacancy')
const { NotFoundError, BadRequestError } = require('../../../utils/error')

const getSkills = async(req,res)=>{
    try {
        const skills = await SkillVacancy.find({team_id:req.params.team_id})
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