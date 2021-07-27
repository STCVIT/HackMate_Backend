// let final_participant = []
// let temp_participant = {}
// participants.forEach(async(participant)=>{
//     const pt_skills = await Skill.find({participant_id:participant._id})
//     temp_participant = {
//         participant,
//         skills:pt_skills
//     }
//     final_participant.push(temp_participant)
// })

const DN_Team = require("../../../models/Dn-Team")
const Hack = require("../../../models/Hack")

//add skills in my teams/admin teams
//request+invite populate team name and leader/participant

// const a = [{a:'a'},{a:'b'}]

// for (b of a){
//     console.log(b)
// }

