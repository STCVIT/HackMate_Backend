require('../../../db/mongoose')
const teamCode = require('../../../middleware/teamCode')

const DN_Team = require('../../../models/Dn-Team')

const createTeam = async(req,res) =>{
    try { 
            const team_code = teamCode()
            const team = new DN_Team({
                name: req.body.name,
                admin_id:req.participant._id,
                team_code,
                //hack_id:req.params.hack_id,
                members:{uid:req.participant._id}
            })
            if(req.params.hack_id != 'null'){
                team.hack_id = req.params.hack_id
            }
            await team.save()
            console.log('hi')
            res.status(201).send(team)
        }catch(e){
            res.status(400).send('lmao')
            console.log(e)
        }
}



module.exports = createTeam