const errorHandler = require('../../../middleware/errorHandler')
const DN_Team = require('../../../models/Dn-Team')
const SkillVacancy = require('../../../models/SkillVacancy')
const { NotFoundError, BadRequestError } = require('../../../utils/error')

const getSkills = async(req,res)=>{
    try {
        console.log('hi')
        console.log(req.participant._id)
        const team = await DN_Team.findOne({_id:req.params.team_id,'members.uid':req.participant._id})
        console.log(team)
        if(!team ){
            return res.send('Unauthorized')
        }
        console.log('hi')
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