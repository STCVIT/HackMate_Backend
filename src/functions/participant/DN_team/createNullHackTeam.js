const errorHandler = require('../../../middleware/errorHandler')
require('../../../db/mongoose')
const teamCode = require('../../../middleware/teamCode')
const DN_Team = require('../../../models/Dn-Team')


const createNullHackTeam = async(req,res) =>{
    try {
        const team_code = teamCode()
        const team = new DN_Team({
            name: req.body.name,
            admin_id:req.participant._id,
            team_code,
            members:{uid:req.participant._id}
        })
        await team.save()
        res.send(team)
    }catch(e){
        res.send('lmao')
        console.log(e)
    }        
}

module.exports = createNullHackTeam