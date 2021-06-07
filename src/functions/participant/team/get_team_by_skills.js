const SkillVacancy = require('../../../models/SkillVacancy')
const Team = require('../../../models/Team')

const get_team_by_skills = async(req,res)=>{
    try {
        const hackTeams = await Team.find({hack_id:req.params.id})
        let validteams = []
        let i = 0
        hackTeams.forEach(async(team)=>{
            const checkTeam = await SkillVacancy.findOne({team_id:team._id,skill:req.body.skill})
            if(checkTeam){
                validteams.push(team)
            }
            i++
            if(i==hackTeams.length){
                res.status(200).send(validteams)
            }

        })
    } catch (e) {
        res.send(e)
    }
}

module.exports = get_team_by_skills