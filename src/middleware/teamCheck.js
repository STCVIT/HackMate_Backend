const Hack = require('../models/Hack')
const {BadRequestError,DuplicateTeamEntryError,TeamFullError} = require('../utils/error')

const teamCheck = async(team) =>{
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
        
         if(check.length<team.members.length){
             const err = new DuplicateTeamEntryError
            return err
         }
         if(team.hack_id){
             const hack = await Hack.findById(team.hack_id)
             console.log(hack)
             if(team.members.length>hack.max_team_size){
                 const err = new TeamFullError
                 return err
             }
         }
         return true
    } catch (e) {
        return new BadRequestError
    }    
}

module.exports = teamCheck