const DN_Team = require('../../../models/Dn-Team')
const errorHandler = require('../../../middleware/errorHandler')
const { NotFoundError, BadRequestError } = require('../../../utils/error')
const teamCheck = require('../../../middleware/teamCheck')

const join_team_by_code = async(req,res)=>{
    try {
        if(req.params.hack_id=='null'){
            var team = await DN_Team.findOne({hack_id:null,team_code:req.body.code})
        }
        else{
            var team = await DN_Team.findOne({hack_id:req.params.hack_id,team_code:req.body.code})
        }
        
        if(!team){
            errorHandler(new NotFoundError,req,res)
            return
        }
        team.members.push({uid:req.participant._id})
        console.log(team)
        await team.save()
        // let check = await teamCheck(team)
        // console.log(check)
        // if (check==true){
        //     await team.save()
        //     res.status(201).send(team)    
        // }
        // else{
        //     errorHandler(check,req,res)
        // }
        res.status(201).send(team)
       
    } catch (e) {
        console.log(e)
        res.send(e)
        // errorHandler(e,req,res)
    }
    
}

module.exports = join_team_by_code