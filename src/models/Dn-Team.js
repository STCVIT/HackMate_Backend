const mongoose = require('mongoose')
const errorHandler = require('../middleware/errorHandler')
const { DuplicateTeamEntryError, TeamFullError } = require('../utils/error')
const Hack = require('./Hack')

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

teamSchema.methods.check = async function(){
    let team = this
    let count = 0 
    try {
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
         console.log(check)
         if(check.length<team.members.length){
             const err = new DuplicateTeamEntryError
            return err
         }
         if(team.hack_id != null){
             const hack = await Hack.find({_id:team.hack_id})
             if(team.members.length>hack.max_team_size){
                 const err = new TeamFullError
                 return err
             }
         }
         return 0
    } catch (e) {
        return e
    }
    
    
}

// teamSchema.pre('save',async function(req,res,next){
//     let team = this
//     let check = team.members.filter((member)=> {return String(member) != String(team.members[team.members.length-1])})
    
//     console.log(check)
//     if(check.length<team.members.length){
//         const err = new DuplicateTeamEntryError
//         next(err)
//     }
//     if(team.hack_id != null){
//         const hack = await Hack.findById(team.hack_id)
//         if(team.members.length>hack.max_team_size){
//             const err = new TeamFullError
//             next(err)
//         }
//     }
//     next()
    
// })

const DN_Team = mongoose.model('DN_Team',teamSchema)
module.exports = DN_Team