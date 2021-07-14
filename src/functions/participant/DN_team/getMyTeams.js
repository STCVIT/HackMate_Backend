const DN_Team = require('../../../models/Dn-Team')

const myTeams = async(req,res) =>{
    try {
        const teams = await DN_Team.find({pmembers:req.participant._id})
        if(!teams || teams.length==0){
            return res.status(404).send('No Teams Found')
        }
        res.status(200).send(teams)
    } catch (e) {
        res.status(400).send(e)
    }
}

module.exports = myTeams