const Invite = require('../models/Invite')
const participantModel = require('../models/Participant')
const Request = require('../models/Request')
const SkillVacancy = require('../models/SkillVacancy')
const Skill = require('../models/Skill')
const projectModel = require('../models/Project')
const DN_Team = require('../models/Dn-Team')
require('../db/mongoose')
const clean = async(team_id) =>{
    const skills = await SkillVacancy.find({team_id})
    const invites = await Invite.find({team_id})
    const requests = await Request.find({team_id})
    console.log(skills,invites,requests)
    await Promise.all(skills.map(skill=>skill.remove()))
    await Promise.all(invites.map(skill=>skill.remove()))
    await Promise.all(requests.map(skill=>skill.remove()))
    console.log('done')
}

const getT= async()=>{
    let team =await DN_Team.find({'members.uid':{$exists:false}})
    // team = team.map(id=>id._id)
    // await Promise.all(team.map(async(id)=>{
    //     await clean(id)
    // }))
    // console.log('done')
    console.log(team)
}
// clean("611ce04d70d77b00162f7173")
// const getP = async()=>{
//      let users = await participantModel.find()//{uid:"SATec04ZrpbKFgw0sIkBbHwpEhm2"})
//     // console.log(users)
//     let ids = users.map((user)=>user._id)
//     // console.log(ids)
//     // console.log(await Skill.find())
//     console.log(await Request.find({participant_id:{$nin:ids}}))
//     console.log(await projectModel.find({participant_id:{$nin:ids}}))
//     console.log(await DN_Team.find({'members.uid':{$nin:ids}}))
// }
// getT()
//clean("610ecb06dd1c48001568e753")

const cleaning= async(id)=>{
    const teams = await DN_Team.find({'members.uid':id})
    const admin = await DN_Team.find({admin_id:id})
    const requests = await Request.find({participant_id:id})
    const invites = await Invite.find({participant_id:id})
    const skills = await Skill.find({participant_id:id})
    console.log(teams,admin,requests,invites,skills)
}
cleaning("6137231cd9aa770016fbc1ea")