const errorHandler = require('../../../middleware/errorHandler')
const {BadRequestError} = require('../../../utils/error')

const deleteTeam = async(req,res)=>{
    try {
        const team = req.team
        console.log('0')
        await team.remove()
        console.log('post')
        res.status(200).send(team)
    } catch (e) {
        console.log(e)
        errorHandler(new BadRequestError,req,res)
    }
}

module.exports = deleteTeam