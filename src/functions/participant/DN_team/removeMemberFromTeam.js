const {NotFoundError,BadRequestError} = require('../../../utils/error')
const errorHandler = require('../../../middleware/errorHandler')

const removeMemberFromTeam = async(req,res) =>{
    try {
        
        const team = req.team
        console.log(team)
        let members = team.members.map((member)=>member.uid)
        console.log(members)
        console.log(req.params.member_id)
        console.log(members.includes(req.params.member_id))
        if(!members.includes(req.params.member_id)){
            errorHandler(new NotFoundError,req,res)
            return
        }
        let updatedMembers = team.members.filter((member)=>{return member.uid != req.params.member_id})
        console.log(updatedMembers)
        team.members = updatedMembers
        await team.save()
        res.status(200).send(team)
    } catch (e) {
        console.log(e)
        errorHandler(new BadRequestError,req,res)
    }
}

module.exports = removeMemberFromTeam