const SkillVacancy = require('../../../models/SkillVacancy')
const DN_Team = require('../../../models/Dn-Team')

const get_team_by_skills = async(req,res)=>{
    try {
        const hackTeams = await DN_Team.find({hack_id:req.params.hack_id})
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