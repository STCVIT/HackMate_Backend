const DN_Team = require('../../../models/Dn-Team')
const Hack = require('../../../models/Hack')
const {NotFoundError}  = require('../../../utils/error')
const errorHandler = require('../../../middleware/errorHandler')
const Skill = require('../../../models/Skill')
const participantModel = require('../../../models/Participant')
const myAdminTeams = async(req,res)=>{
    try {
    const check = await DN_Team.findOne({'members.uid':req.participant._id,hack_id:req.params.hack_id})
    if(check){
        return res.status(403).send('already going to hack,cannot add another team')
    }
        let myTeams=[]
        const hack = await Hack.findOne({_id:req.params.hack_id})
        const hackTeams = await DN_Team.find({hack_id:req.params.hack_id}) 
        if(!hackTeams || hackTeams.length==0){
             myTeams = await DN_Team.find({admin_id:req.participant._id,hack_id:null})
           if(myTeams.length==0 || !myTeams){
               return errorHandler(new NotFoundError,req,res)
           }
        }else{
            let members = []
            let temp = hackTeams.map((team)=>{return team.members})
            temp.forEach(member => {
                member.forEach((doc)=>members.push(doc.uid))
            });
            
              myTeams = await DN_Team.find({'members.uid':{$nin:members},hack_id:null,admin_id:req.participant._id})
            if(!myTeams || myTeams.length==0){
                return errorHandler(new NotFoundError,req,res)
            }
        }
        let eligibleTeams = []
        myTeams.forEach((team)=>{
            if(team.members.length<=hack.max_team_size){
                eligibleTeams.push(team)
            }
        })
        if(!eligibleTeams){
           return errorHandler(new NotFoundError,req,res)
        }
        let final = []
        for await (team of eligibleTeams){
            let pt_skill = []
            let members = team.members.map((member)=>member.uid)
            let participants = await participantModel.find({_id:{$in:members}})
            for await (participant of participants){
                let skills = await Skill.find({participant_id:participant._id})
                pt_skill.push({participant,skills})
            }
            final.push({team,pt_skill})
        }
        res.status(200).send(final)
    } catch (e) {
        res.status(400).send(e)
    }
    
}

module.exports = myAdminTeams