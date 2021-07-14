const DN_Team = require('../../../models/Dn-Team')
const Hack = require('../../../models/Hack')

const myAdminTeams = async(req,res)=>{
    try {
        let myTeams=[]
        const hack = await Hack.findOne({_id:req.params.hack_id})
        const hackTeams = await DN_Team.find({hack_id:req.params.hack_id}) 
        if(!hackTeams || hackTeams.length==0){
             myTeams = await DN_Team.find({admin_id:req.participant._id,hack_id:null})
           if(myTeams.length==0 || !myTeams){
               return res.send('No teams found')
           }
        }else{
            let members = []
            let temp = hackTeams.map((team)=>{return team.members})
            temp.forEach(member => {
                member.forEach((doc)=>members.push(doc.uid))
            });
            
              myTeams = await DN_Team.find({'members.uid':{$nin:members},hack_id:null,admin_id:req.participant._id})
            if(!myTeams || myTeams.length==0){
                return res.status(404).send('No teams found')
            }
        }
        console.log(myTeams)
        let eligibleTeams = []
        myTeams.forEach((team)=>{
            if(team.members.length<=hack.max_team_size){
                eligibleTeams.push(team)
            }
        })
        res.status(200).send(eligibleTeams)
    } catch (e) {
        res.status(400).send(e)
    }
    
}

module.exports = myAdminTeams