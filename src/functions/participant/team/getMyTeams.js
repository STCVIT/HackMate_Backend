const Team = require('../../../models/Team')
const ParticipantTeam = require('../../../models/ParticipantTeam')

const myTeams = async(req,res) =>{
    try {
        const teams = await ParticipantTeam.find({participant_id:req})
        let myTeams = []
        let i = 0
        teams.forEach(async(team)=>{
            const myTeam = await Team.findOne({_id:team.team_id})
            myTeams.push(myTeam)
            i++
            if(i==teams.length){
                res.status(200).send(myTeams)
            }
        })
    } catch (e) {
        res.status(200).send(e)
    }
}

module.exports = myTeams