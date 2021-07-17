const SkillVacancy = require('../../../models/SkillVacancy')
const DN_Team = require('../../../models/Dn-Team')
const errorHandler = require('../../../middleware/errorHandler')
const { NotFoundError, BadRequestError } = require('../../../utils/error')
const paginate = require('../../../middleware/paginate')

//participant+skills

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
            const checkTeam = await SkillVacancy.findOne({team_id:team._id,skill:{$in:req.body.skill}})
            if(checkTeam){
                validteams.push(team)
            }
            console.log(validteams)
            i++
            if(i==hackTeams.length){
                if(validteams.length == 0 || !validteams ){
                    errorHandler(new NotFoundError,req,res)
                    return
                }
                const page = Number(req.query.page)
                const length = validteams.length
                const final = paginate(validteams,8,page)
                if(!final || final.length==0){
                    return res.send('not found')
                }
                res.status(200).send({final,length})
            }

        })
    } catch (e) {
        errorHandler(new BadRequestError,req,res)
    }
}

module.exports = get_team_by_skills