require('../../../db/mongoose')
const errorHandler = require('../../../middleware/errorHandler')
const teamCode = require('../../../middleware/teamCode')
const DN_Team = require('../../../models/Dn-Team')
const { DuplicateTeamHackError } = require('../../../utils/error')

const createTeam = async(req,res) =>{
    try { 
            const team_code = teamCode()
            const team = new DN_Team({
                name: req.body.name,
                admin_id:req.participant._id,
                team_code,
                members:{uid:req.participant._id}
            })
            if(req.params.hack_id != 'null'){
                team.hack_id = req.params.hack_id
            }
            await team.save()
            res.status(201).send(team)
        }catch(e){
            if(e.code===11000){
                return errorHandler(new DuplicateTeamHackError,req,res)
            }
            else{
                return errorHandler(e,req,res)
            }
            
        }
}



module.exports = createTeam