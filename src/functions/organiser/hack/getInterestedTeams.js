const errorHandler = require('../../../middleware/errorHandler')
const Team = require('../../../models/Team')
const { NotFoundError } = require('../../../utils/error')

const getInterestedTeams = async(req,res)=>{
    try {
        const page = Number(req.query.page)
        const start = (page-1)*12
        const limit = 12
        const end = start + limit
        const teams = await Team.find({hack_id:req.params.hack_id})
        if(teams.length===0 || !teams){
            throw new NotFoundError
        }
        let length
        if(teams.length%12==0){
            length = teams/12
        }
        else{
            length = teams/12 + 1
        }
        const newTeams = teams.slice(start,end)
        if(!newTeams || newTeams.length==0){
            return res.send('not found')
        }
        res.status(200).send({newTeams,length})   
    } catch (e) {
        errorHandler(e,req,res)
    }   
}
//check this
module.exports = getInterestedTeams