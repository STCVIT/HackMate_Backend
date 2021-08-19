const DN_Team = require('../../../models/Dn-Team')
const errorHandler = require('../../../middleware/errorHandler')
const { NotFoundError, BadRequestError } = require('../../../utils/error')
const teamCheck = require('../../../middleware/teamCheck')

const join_team_by_code = async(req,res)=>{
    try {
        let team = {}
        if(req.params.hack_id=='null'){
            team = await DN_Team.findOne({hack_id:null,team_code:req.body.code})
        }
        else{
            team = await DN_Team.findOne({hack_id:req.params.hack_id,team_code:req.body.code})
        }
        if(!team){
            return errorHandler(new NotFoundError,req,res) 
        }
        team.members.push({uid:req.participant._id})
        await team.save()
        res.status(201).send(team)
       
    } catch (e) {
        if(e.message && e.statusCode){
            return errorHandler(e,req,res)
        }
        else{
            errorHandler(new BadRequestError,req,res)
        }
    }
    
}

module.exports = join_team_by_code

//checking without hooks
// let check = await teamCheck(team)
        // console.log(check)
        // if (check==true){
        //     await team.save()
        //     res.status(201).send(team)    
        // }
        // else{
        //     errorHandler(check,req,res)
        // }