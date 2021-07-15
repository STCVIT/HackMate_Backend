const SkillVacancy = require('../../../models/SkillVacancy')
const DN_Team = require('../../../models/Dn-Team')
const errorHandler = require('../../../middleware/errorHandler')
const { NotFoundError, BadRequestError } = require('../../../utils/error')

const get_team_by_skills = async(req,res)=>{
    try {
        const hackTeams = await DN_Team.find({hack_id:req.params.hack_id})
        if(!hackTeams||hackTeams.length==0){
            errorHandler(new NotFoundError,req,res)
            return
        }
        let validteams = []
        let i = 0
        hackTeams.forEach(async(team)=>{
            const checkTeam = await SkillVacancy.findOne({team_id:team._id,skill:req.body.skill})
            if(checkTeam){
                validteams.push(team)
            }
            i++
            if(i==hackTeams.length){
                if(validTeams.length==0 || !validTeams ){
                    errorHandler(new NotFoundError,req,res)
                    return
                }
                res.status(200).send(validteams)
            }

        })
    } catch (e) {
        errorHandler(new BadRequestError,req,res)
    }
}

module.exports = get_team_by_skills