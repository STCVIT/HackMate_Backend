const Team = require('../../../models/Team')

const myAdminTeams = async(req,res)=>{
    try {
        const teams = await Team.find({hack_id:null,admin_id:req.participant._id}) 
        res.status(200).send(teams)
    } catch (e) {
        res.status(400).send(e)
    }
    
}

module.exports = myAdminTeams