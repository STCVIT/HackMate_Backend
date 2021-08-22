const errorHandler = require('../../../middleware/errorHandler')
const DN_Team = require('../../../models/Dn-Team')
const Hack = require('../../../models/Hack')
const { NotFoundError, BadRequestError } = require('../../../utils/error')
const paginate = require('../../../middleware/paginate')
const Skill = require('../../../models/Skill')
const participantModel = require('../../../models/Participant')

const myTeams = async(req,res) =>{
    try {
        const teams = await DN_Team.find({'members.uid':req.participant._id})
        if(!teams || teams.length==0){
            return errorHandler(new NotFoundError,req,res)
        }
        const page = Number(req.query.page)
        const length = teams.length
        const temp = paginate(teams,8,page)
        if(!temp || temp.length==0){
            return errorHandler(new NotFoundError,req,res)
        }
        let final = []
        await Promise.all(temp.map(async(team)=>{
            let hackName = ''
            if (team.hack_id){
                let hack = await Hack.findById(team.hack_id)
                hackName = hack.name
            }
            let members = team.members.map((member)=>member.uid)
            let participants = await participantModel.find({_id:{$in:members}})
            let pt_skill = []
            await Promise.all(participants.map(async(participant)=>{
                let skills = await Skill.find({participant_id:participant._id})
                pt_skill.push({participant,skills})
            }))
            
            final.push({team,hackName,pt_skill})
        }))
        
        res.status(200).send({final,length})
    } catch (e) {
        errorHandler(new BadRequestError,req,res)
    }
}

module.exports = myTeams

// for await (participant of participants){
//     let skills = await Skill.find({participant_id:participant._id})
//     pt_skill.push({participant,skills})
// }

// for await (team of temp){
//     let hackName = ''
//     if (team.hack_id){
//         let hack = await Hack.findById(team.hack_id)
//         hackName = hack.name
//     }
//     let members = team.members.map((member)=>member.uid)
//     let participants = await participantModel.find({_id:{$in:members}})
//     let pt_skill = []
//     for await (participant of participants){
//         let skills = await Skill.find({participant_id:participant._id})
//         pt_skill.push({participant,skills})
//     }
//     final.push({team,hackName,pt_skill})
// }