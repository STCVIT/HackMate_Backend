const projectModel = require('../../../models/Project')
const DN_Team = require('../../../models/Dn-Team')
const errorHandler = require('../../../middleware/errorHandler')
const { NotFoundError, BadRequestError } = require('../../../utils/error')

const getAll = async(req,res)=>{
    try {
        const individualProjects = await projectModel.find({participant_id:req.participant._id})
        const teams = await DN_Team.find({'members.uid':req.participant._id,project_name:{$exists:true},project_description:{$exists:true}})
        if((!teams || teams.length==0) && (!individualProjects || individualProjects.length==0)){
            errorHandler(new NotFoundError,req,res)
            return
        }
        res.status(200).send({individualProjects,teams})
        
    } catch (e) {
        errorHandler(new BadRequestError,req,res)
    }
}

module.exports = getAll