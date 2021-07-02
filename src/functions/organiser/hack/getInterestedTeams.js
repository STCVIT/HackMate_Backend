const errorHandler = require('../../../middleware/errorHandler')
const Team = require('../../../models/Team')
const { NotFoundError } = require('../../../utils/error')

const getInterestedTeams = async(req,res)=>{
    try {
        const teams = await Team.find({hack_id:req.params.hack_id})
        if(teams.length===0 || !teams){
            throw new NotFoundError
        }
        res.status(200).send(teams)   
    } catch (e) {
        errorHandler(e,req,res)
    }   
}
//check this
module.exports = getInterestedTeams