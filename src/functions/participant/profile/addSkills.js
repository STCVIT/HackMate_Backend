const mongoose = require('mongoose')

const Skill = require('../../../models/Skill')

const addSkills = async(req,res)=>{
    const session = await mongoose.startSession()
    await session.withTransaction(async()=>{
        try {
            const opt = {session};
            const prevSkills = await Skill.find({participant_id:req.participant._id})
            prevSkills.forEach(async(skill)=>{
                await skill.remove(opt)
            })
            const skills = req.body.skills
            let skillArr = [];
            let i = 0
            skills.forEach((skill)=>{
                let obj = {
                    skill,
                    participant_id:req.participant._id
                }
                skillArr.push(obj)
                i++
                if(i==skills.length){
                    const mySkills = Skill.create(skillArr,opt)
                    res.status(201).send(mySkills)
                }
        })
        } catch (e) {
            res.status(400).send('oof')
            
        }
        
    })
    session.endSession()
}

module.exports = addSkills