const Skill = require('../../../models/Skill')
//transaction control
//check if incoming skills = []
const addSkills = async(req,res) => {
    await Skill.deleteMany({participant_id:req.participant._id})
    const skills = req.body.skills
    let skillRecords = []
    let i = 0
    skills.forEach(async(skill) => {
        const newSkill = new Skill({
            skill,
            participant_id:req.participant._id
        })
        await newSkill.save()
        i++
        skillRecords.push(newSkill)
        if (i==skills.length){
            res.status(201).send(skillRecords)
        }
    })
}

module.exports = addSkills