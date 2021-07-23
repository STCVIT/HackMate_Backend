const errorHandler = require("../../../middleware/errorHandler")
const paginate = require("../../../middleware/paginate")
const DN_Team = require("../../../models/Dn-Team")
const participantModel = require("../../../models/Participant")
const SkillVacancy = require("../../../models/SkillVacancy")
const { NotFoundError, BadRequestError } = require("../../../utils/error")


const getAllTeams = async(req,res)=>{
    let final = []
    let teams = []
    let temp = []
    try {
        if(req.params.hack_id != 'null'){
            teams = await DN_Team.find({hack_id:req.params.hack_id,'members.uid':{$ne:req.participant._id}})
        }
        else{
            teams = await DN_Team.find({hack_id:null,'members.uid':{$ne:req.participant._id}})
        }
        let length = teams.length
        temp = paginate(teams,8,Number(req.query.page))
        if(temp.length==0){
            return errorHandler(new NotFoundError,req,res)
        }
        let i = 0
        temp.forEach(async(team)=>{
            const members = team.members.map((member)=>member.uid)
            const participants = await participantModel.find({_id:{$in:members}})
            const skills = await SkillVacancy.find({team_id:team._id})
            let temp_team = {
                team,
                participants,
                skills
            }
            final.push(temp_team)
            i++
            if(i==temp.length){
                res.status(200).send({final,length})
            }
        })
    } catch (e) {
        errorHandler(new BadRequestError,req,res)
    }
    
    
}

module.exports = getAllTeams