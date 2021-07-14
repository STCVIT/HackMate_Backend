const DN_Team = require('../models/Dn-Team')

const checkAdmin = async(req,res,next) =>{
    const team = await DN_Team.findOne({_id:req.params.team_id,admin_id:req.participant._id})
    console.log(team)
    if(!team){
        return res.status(403).send('Unauthorized')   
    } 
    next()
}

module.exports = checkAdmin