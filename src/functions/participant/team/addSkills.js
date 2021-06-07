const SkillVacancy = require('../../../models/SkillVacancy')

const addSkills = async(req,res) =>{
    await SkillVacancy.deleteMany({team_id:req.params.id})
    const skills = req.body.skills
        let skillRecords = []
        let i = 0
        skills.forEach(async(skill) => {
            const teamSkill = new SkillVacancy({
                skill,
                team_id:req.params.id
            })
            await teamSkill.save()
            i++
            skillRecords.push(teamSkill)
            if (i==skills.length){
                res.status(201).send(skillRecords)
            }
        })
}

module.exports = addSkills