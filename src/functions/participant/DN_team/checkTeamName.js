const errorHandler = require('../../../middleware/errorHandler')
const DN_Team = require('../../../models/Dn-Team')
const { BadRequestError } = require('../../../utils/error')

const checkTeamName = async(req,res)=>{
    try {
        const team = await DN_Team.find({name:req.params.team_name})
    if(!team){
        res.status(200).send('ok')
    }
    else{
        res.status(400).send('nope')
    }
    } catch (e) {
        errorHandler(new BadRequestError,req,res)
    }
    
}

module.exports = checkTeamName