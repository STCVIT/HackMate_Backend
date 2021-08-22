const errorHandler = require('../../../middleware/errorHandler')
const SkillVacancy = require('../../../models/SkillVacancy')
const { BadRequestError } = require('../../../utils/error')

const addSkills = async(req,res) =>{
    try {
        const skills = req.body.skills
    if(skills.length==0){
        return res.status(404).send('Please enter some skills')
    }
    const allowed_skills = ['frontend','backend','ml','ui/ux','appdev','management','blockchain','cybersecurity']
    const isAllowed = skills.every((skill)=>allowed_skills.includes(skill))
    if(!isAllowed){
        return res.status(403).send('Invalid skills')
    }
    await SkillVacancy.deleteMany({team_id:req.params.team_id})
        let skillRecords = []
        await Promise.all(skills.map(async(skill)=>{
            const teamSkill = new SkillVacancy({
                skill,
                team_id:req.params.team_id
            })
            await teamSkill.save()
            skillRecords.push(teamSkill)
        }))
        res.status(201).send(skillRecords)
    } catch (e) {
        errorHandler(new BadRequestError,req,res)
    }
    
}

module.exports = addSkills

//OLD CODE

// let i = 0
// skills.forEach(async(skill) => {
//     const teamSkill = new SkillVacancy({
//         skill,
//         team_id:req.params.team_id
//     })
//     await teamSkill.save()
//     i++
//     skillRecords.push(teamSkill)
//     if (i==skills.length){
//         res.status(201).send(skillRecords)
//     }
// })
