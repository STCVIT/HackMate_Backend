const DN_Team = require('../../../models/Dn-Team')
const errorHandler = require('../../../middleware/errorHandler')

const join_team_by_code = async(req,res)=>{
    try {
        if(req.params.hack_id=='null'){
            var team = await DN_Team.findOne({hack_id:null,team_code:req.body.code})
        }
        else{
            var team = await DN_Team.findOne({hack_id:req.params.hack_id,team_code:req.body.code})
        }
        
        if(!team){
            return res.status(404).send('No team found!')
        }
        team.members.push({uid:req.participant._id})
        let x = await team.check()
        if (x==0){
            await team.save()
            res.status(201).send(team)    
        }
        else{
            errorHandler(x,req,res)
        }
       
    } catch (e) {
        res.send(e)
    }
    
}

module.exports = join_team_by_code