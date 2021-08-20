const SkillVacancy = require('../../../models/SkillVacancy')
const DN_Team = require('../../../models/Dn-Team')
const errorHandler = require('../../../middleware/errorHandler')
const { NotFoundError, BadRequestError } = require('../../../utils/error')
const paginate = require('../../../middleware/paginate')
const Participant = require('../../../models/Participant')

const get_team_by_skills = async(req,res)=>{
    try {
        let hackTeams = []
        if(req.params.hack_id!='null'){
           hackTeams = await DN_Team.find({hack_id:req.params.hack_id,'members.uid':{$ne:req.participant._id}})
        }
        else{
            hackTeams = await DN_Team.find({hack_id:null,'members.uid':{$ne:req.participant._id}})
        }
        if(!hackTeams||hackTeams.length==0){
            return errorHandler(new NotFoundError,req,res)
            
        }
        let validteams = []
        let i = 0
        hackTeams.forEach(async(team)=>{
            const checkTeam = await SkillVacancy.findOne({team_id:team._id,skill:{$in:req.query.skill}})
            if(checkTeam){
                validteams.push(team)
            }
            i++
            if(i==hackTeams.length){
                if(validteams.length == 0 || !validteams ){
                    return errorHandler(new NotFoundError,req,res)
                }
                const page = Number(req.query.page)
                const length = validteams.length
                const temp = paginate(validteams,8,page)
                console.log(temp)
                if(!temp || temp.length==0){
                    return errorHandler(new NotFoundError,req,res)
                }
                let final = []
                let j = 0
                temp.forEach(async(team)=>{
                    const skills = await SkillVacancy.find({team_id:team._id})
                    const members = team.members.map((member)=>member.uid)
                    const participants = await Participant.find({_id:{$in:members}})
                    let final_team = {
                        team,
                        skills,
                        participants
                    }
                    final.push(final_team)
                    j++
                    if(j==temp.length){
                        res.status(200).send({final,length})
                    }
                })
                
            }

        })
    } catch (e) {
        errorHandler(new BadRequestError,req,res)
    }
}

module.exports = get_team_by_skills

// await Promise.all(hackTeams.map(async(team)=>{

// }))