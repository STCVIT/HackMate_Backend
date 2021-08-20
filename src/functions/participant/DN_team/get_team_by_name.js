const errorHandler = require('../../../middleware/errorHandler')
const DN_Team = require('../../../models/Dn-Team')
const { NotFoundError, BadRequestError } = require('../../../utils/error')
const SkillVacancy = require('../../../models/SkillVacancy')
const Participant = require('../../../models/Participant')

// const get_team_by_name = async(req,res)=>{
//     try {
//         if(req.query.name==undefined){
//             return res.status(400).send('please enter a name')
//         }
//         let final = []
//         let i = 0
//         if(req.params.hack_id != 'null'){
//             const teams = await DN_Team.find({hack_id:req.params.hack_id,name:req.query.name,'members.uid':{$ne:req.participant._id}}).collation({locale:'en', strength:2})
//             if(!teams || teams.length==0){
//                 return errorHandler(new NotFoundError,req,res)
               
//             }
//             teams.forEach(async(team)=>{
//                 const skills = await SkillVacancy.find({team_id:team._id})
//                 const members = team.members.map((member)=>member.uid)
//                 const participants = await Participant.find({_id:{$in:members}})
//                 const temp = {
//                     team,
//                     participants,
//                     skills
//                 }
//                 final.push(temp)
//                 i++
//                 if(teams.length==i){
//                     return res.status(200).send(final)
//                 }
//             })
            
//         }
//         else{
//             console.log('hi')
//             const teams = await DN_Team.find({hack_id:null,name:req.query.name,'members.uid':{$ne:req.participant._id}}).collation({locale:'en', strength:2})
//             if(!teams || teams.length==0){
//                 return errorHandler(new NotFoundError,req,res)
//             }
//             teams.forEach(async(team)=>{
//                 const skills = await SkillVacancy.find({team_id:team._id})
//                 const members = team.members.map((member)=>member.uid)
//                 const participants = await Participant.find({_id:{$in:members}})
//                 const temp = {
//                     team,
//                     participants,
//                     skills
//                 }
//                 final.push(temp)
//                 i++
//                 if(teams.length==i){
//                     return res.status(200).send(final)
//                 }
//             })
            
//         }
        
//     } catch (e) {
//         errorHandler(new BadRequestError,req,res)
//     }
    
// } 

const get_team_by_name = async(req,res)=>{
    try {
        if(req.query.name==undefined){
            return res.status(400).send('please enter a name')
        }
        let final = []
        let teams = []
        if(req.params.hack_id != 'null'){
            teams = await DN_Team.find({hack_id:req.params.hack_id,name:req.query.name,'members.uid':{$ne:req.participant._id}}).collation({locale:'en', strength:2})
        }
        else{
            teams = await DN_Team.find({hack_id:null,name:req.query.name,'members.uid':{$ne:req.participant._id}}).collation({locale:'en', strength:2})    
        }
        if(!teams || teams.length==0){
            return errorHandler(new NotFoundError,req,res)
        }
        await Promise.all(teams.map(async(team)=>{
            const skills = await SkillVacancy.find({team_id:team._id})
            const members = team.members.map((member)=>member.uid)
            const participants = await Participant.find({_id:{$in:members}})
            const temp = {
                team,
                participants,
                skills
            }
            final.push(temp)
        }))
        return res.status(200).send(final)        
    } catch (e) {
        errorHandler(new BadRequestError,req,res)
    }
}


module.exports = get_team_by_name