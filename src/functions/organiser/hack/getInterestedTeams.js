const errorHandler = require('../../../middleware/errorHandler')
const paginate = require('../../../middleware/paginate')
const Hack = require('../../../models/Hack')
const Team = require('../../../models/Team')
const { NotFoundError, BadRequestError } = require('../../../utils/error')

const getInterestedTeams = async(req,res)=>{
    try {
        const page = Number(req.query.page)
        const hack = await Hack.find({_id:req.params.hack_id,organiser_id:req.organiser._id})
        if(!hack){
            return errorHandler(new NotFoundError,req,res)
        }
        const teams = await Team.find({hack_id:req.params.hack_id})
        if(teams.length===0 || !teams){
            return errorHandler(new NotFoundError,req,res)
        }
        let length = teams.length
        const newTeams = paginate(teams,12,page)
        if(!newTeams || newTeams.length==0){
            return errorHandler(new NotFoundError,req,res)
        }
        res.status(200).send({newTeams,length})   
    } catch (e) {
        errorHandler(new BadRequestError,req,res)
    }   
}
//check this
module.exports = getInterestedTeams