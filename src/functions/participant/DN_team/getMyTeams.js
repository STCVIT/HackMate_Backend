const errorHandler = require('../../../middleware/errorHandler')
const DN_Team = require('../../../models/Dn-Team')
const { NotFoundError, BadRequestError } = require('../../../utils/error')

const myTeams = async(req,res) =>{
    try {
        const teams = await DN_Team.find({'members.uid':req.participant._id})
        if(!teams || teams.length==0){
            errorHandler(new NotFoundError,req,res)
            return
        }
        res.status(200).send(teams)
    } catch (e) {
        errorHandler(new BadRequestError,req,res)
    }
}

module.exports = myTeams