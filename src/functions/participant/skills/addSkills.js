const Skill = require('../../../models/Skill')

const addSkills = async(req,res) => {
    try {
    let check = 0
    const skills = req.body.skills
    if(skills.length==0){
        return res.send('Please enter some skills')
    }
    const allowed_skills = ['frontend','backend','ml','ui/ux','appdev']
    const isAllowed = skills.every((skill)=>{allowed_skills.includes(skill)})
    if(!isAllowed){
        return res.send('Invalid skills')
    }
    await Skill.deleteMany({participant_id:req.participant._id})
    let skillRecords = []
    let i = 0
    skills.forEach(async(skill) => {
        const newSkill = new Skill({
            skill,
            participant_id:req.participant._id
        })
        await newSkill.save()
        skillRecords.push(newSkill)
        i++
        if(i==skills.length){
            res.status(201).send(skillRecords)
        }
    })
    
    } catch (e) {
        res.status(400).send(e)   
    }
}

module.exports = addSkills