const projectModel = require('../../../models/Project')
const Team = require('../../../models/Team')
const ParticipantTeam = require('../../../models/ParticipantTeam')

const getAll = async(req,res)=>{
    try {
        const individualProjects = await projectModel.find({participant_id:req.participant._id})
        const teams = await ParticipantTeam.find({participant_id:req.participant._id})
        let myTeams = []
        let i = 0
        teams.forEach(async(team)=>{
            const temp = await Team.find({_id:team.team_id})//,project_name:{$size:1}})
            //if
            myTeams.push(temp)
            i++
            if(i==teams.length){
                res.status(200).send({individualProjects,myTeams})
            }
        })
    } catch (e) {
        res.status(400).send(e)
    }
}

module.exports = getAll