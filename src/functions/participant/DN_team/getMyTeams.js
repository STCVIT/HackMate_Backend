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
            errorHandler(new NotFoundError,req,res)
            return
        }
        const page = Number(req.query.page)
        const length = teams.length
        const temp = paginate(teams,8,page)
        if(!temp || temp.length==0){
            return res.send('Not found')
        }
        let final = []
        for await (team of temp){
            let hackName = ''
            if (team.hack_id){
                let hack = await Hack.findById(team.hack_id)
                hackName = hack.name
            }
            let members = team.members.map((member)=>member.uid)
            let participants = await participantModel.find({_id:{$in:members}})
            let pt_skill = []
            for await (participant of participants){
                let skills = await Skill.find({participant_id:participant._id})
                pt_skill.push({participant,skills})
            }
            final.push({team,hackName,pt_skill})
        }
        // temp.forEach(async(team)=>{
        //     let hackName = ''
        //     let team_participants = []
        //     if(team.hack_id){
        //         let hack = await Hack.findOne({_id:team.hack_id})
        //         let members = temp.members.map((member)=>member.uid)
        //         const participants = await Participant.find({_id:{$in:members}})
        //         participants.forEach(async(participant) => {
        //             const skills =await Skill.find({participant_id:participant._id})
                    
        //         });
        //         let temp_team = {
        //             team,
        //             hackName
        //         }
        //         hackName = hack.name
        //     }
            
        //     final.push(temp_team)
        // })
        res.status(200).send({final,length})
    } catch (e) {
        errorHandler(new BadRequestError,req,res)
    }
}

module.exports = myTeams