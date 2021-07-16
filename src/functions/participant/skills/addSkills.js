const Skill = require('../../../models/Skill')
//transaction control
//check if incoming skills = []
const addSkills = async(req,res) => {
    try {
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
        skillRecords.push(newSkill)
    })
    res.status(201).send(skillRecords)
    } catch (e) {
        res.status(400).send(e)   
    }
}

module.exports = addSkills