const mongoose = require('mongoose')
// const errorHandler = require('../middleware/errorHandler')
const { DuplicateTeamEntryError, TeamFullError, BadRequestError } = require('../utils/error')


const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    team_code: {
        type: String,
        required: true,
    },
    project_name: {
        type: String
    },
    project_description: {
        type: String
    },
    code: {
        type: String
    },
    design: {
        type: String
    },
    demonstration: {
        type: String
    },
    hack_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Hack'
    },
    members:[
        //{type:Array, of:mongoose.Schema.Types.ObjectId}
          {
              uid:{
                  type:mongoose.Schema.Types.ObjectId,
                  required:true
              }
          }   
        ]       
})
teamSchema.index({team_code:1,hack_id:1},{unique:true})
teamSchema.index({'members.uid':1,hack_id:1},{unique:true , partialFilterExpression: { hack_id : { $exists: true} } })
teamSchema.index({name:1,hack_id:1},{unique:true})

// teamSchema.methods.check = async function(){
//     console.log("Hack model: ",Hack)
//     console.log(Invite)
//     let team = this
//     let count = 0 
//     try {
//         let check = team.members.filter((member)=>{
//             if( String(member.uid) != String(team.members[team.members.length-1].uid)){
//                 return member.uid
//             }else{
//                 if (count == 0){
//                     count++
//                     return member.uid
//                 }
//             }
//          })
        
//          if(check.length<team.members.length){
//              const err = new DuplicateTeamEntryError
//             return err
//          }
//          if(team.hack_id){
//              console.log(team.hack_id)
//              const invites = await Invite.find()
//              console.log('invites; ',invites)
//              Hack.f
//              const hack = await Hack.findById(team.hack_id)
//              console.log(hack)
//              if(team.members.length>hack.max_team_size){
//                  const err = new TeamFullError
//                  return err
//              }
//          }
//          return true
//     } catch (e) {
//         return e
//     }    
// }

teamSchema.post('remove',async function(next){
    const team = this 
    const skillVacancies = await SkillVacancy.find({team_id:team._id})
    await Promise.all(skillVacancies.map((sv)=>sv.remove()))
    const invites = await Invite.find({team_id:team._id})
    await Promise.all(invites.map((invite)=>invite.remove()))
    const requests = await Request.find({team_id:team._id})
    await Promise.all(requests.map((request)=>request.remove()))
})

teamSchema.pre('save',async function(next){
    try {
        const team = this
    let count = 0 
        let check = team.members.filter((member)=>{
            if( String(member.uid) != String(team.members[team.members.length-1].uid)){
                return member.uid
            }else{
                if (count == 0){
                    count++
                    return member.uid
                }
            }
         })
        
         if(check.length<team.members.length){
             const err = new DuplicateTeamEntryError
            next(err)
         }
         if(team.hack_id){
            const Hack = require('./Hack')
             const hack = await Hack.findById(team.hack_id)
             console.log(hack)
             if(team.members.length>hack.max_team_size){
                 const err = new TeamFullError
                 next(err)
             }
         }
         next()
        
    } catch (e) {
        next(e)
    }
    
})

const DN_Team = mongoose.model('DN_Team',teamSchema)
module.exports = DN_Team