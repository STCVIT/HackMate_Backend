const errorHandler = require('../../../middleware/errorHandler')
const {BadRequestError} = require('../../../utils/error')

const deleteTeam = async(req,res)=>{
    try {
        const team = req.team
        await team.remove()
        res.status(200).send(team)
    } catch (e) {
        errorHandler(new BadRequestError,req,res)
    }
}

module.exports = deleteTeam