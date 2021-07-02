const Team = require('../models/Team')

const checkAdmin = async(req,res,next) =>{
    const team = await Team.findOne({_id:req.params.team_id,admin_id:req.participant._id})
    console.log(team)
    if(!team){
        return res.status(401).send('Unauthorized')   
    } 
    next()
}

module.exports = checkAdmin