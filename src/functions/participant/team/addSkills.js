const SkillVacancy = require('../../../models/SkillVacancy')

const addSkills = async(req,res) =>{
    const skills = req.body.skills
        const skillRecords = []
        skills.forEach(async(skill) => {
            const teamSkill = new SkillVacancy({
                skill,
                team_id:team._id
            })
            await teamSkill.save()
            skillRecords.push(teamSkill)
        })
        res.status(201).send(skillRecords)
}

module.exports = addSkills