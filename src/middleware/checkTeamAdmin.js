const Team = require('../models/Team')

const checkAdmin = async(req,res,next) =>{
    const team = await Team.findOne({_id:req.params.id,admin:req.organiser._id})
    if(!team){
        return res.status(401).send('Unauthorized')   
    } 
    next()
}

module.exports = checkAdmin