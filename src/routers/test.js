const Invite = require('../models/Invite')
const Request = require('../models/Request')
const SkillVacancy = require('../models/SkillVacancy')
require('../db/mongoose')
const clean = async(team_id) =>{
    const skills = await SkillVacancy.find({team_id})
    const invites = await Invite.find({team_id})
    const requests = await Request.find({team_id})
    console.log(skills,invites,requests)
    // await Promise.all(skills.map(skill=>skill.remove()))
    // await Promise.all(invites.map(skill=>skill.remove()))
    // await Promise.all(requests.map(skill=>skill.remove()))
    // console.log('done')
}

clean("6118043a728b472bdc79e24d")
