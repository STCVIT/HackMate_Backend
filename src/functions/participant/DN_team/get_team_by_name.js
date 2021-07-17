const errorHandler = require('../../../middleware/errorHandler')
const DN_Team = require('../../../models/Dn-Team')
const { NotFoundError, BadRequestError } = require('../../../utils/error')

//participant+skills

const get_team_by_name = async(req,res)=>{
    try {
        if(req.params.hack_id != 'null'){
            const teams = await DN_Team.find({hack_id:req.params.hack_id,name:req.body.name}).collation({locale:'en', strength:2})
            if(!teams || teams.length==0){
                errorHandler(new NotFoundError,req,res)
                return
            }
            return res.status(200).send(teams)
        }
        else{
            const teams = await DN_Team.find({hack_id:null,name:req.body.name}).collation({locale:'en', strength:2})
            if(!teams || teams.length==0){
                errorHandler(new NotFoundError,req,res)
                return
            }
            return res.status(200).send(teams)
        }
        
    } catch (e) {
        errorHandler(new BadRequestError,req,res)
    }
    
} 

module.exports = get_team_by_name