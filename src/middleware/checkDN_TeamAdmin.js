const DN_Team = require('../models/Dn-Team')
const { NotFoundError, AuthenticationError } = require('../utils/error')
const errorHandler = require('./errorHandler')

const checkAdmin = async(req,res,next) =>{
    const team = await DN_Team.findOne({_id:req.params.team_id})
    if(!team){
        return errorHandler(new NotFoundError,req,res)
    }
    if(String(team.admin_id)!=String(req.participant._id)){
        return errorHandler(new AuthenticationError,req,res)
    }
    req.team = team 
    next()
}

module.exports = checkAdmin