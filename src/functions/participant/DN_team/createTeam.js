require('../../../db/mongoose')
const teamCode = require('../../../middleware/teamCode')

const DN_Team = require('../../../models/Dn-Team')
const ParticipantTeam = require('../../../models/ParticipantTeam')

const createTeam = async(req,res) =>{
    try { 
            const team_code = teamCode()
            const team = new DN_Team({
                name: req.body.name,
                admin_id:req.participant._id,
                team_code,
                hack_id:req.params.hack_id,
                members:{uid:req.participant._id}
            })
            await team.check()
            await team.save()
            res.status(201).send(team)
        }catch(e){
            res.send('lmao')
            console.log(e)
        }
}



module.exports = createTeam