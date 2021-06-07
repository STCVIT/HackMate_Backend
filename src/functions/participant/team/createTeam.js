const errorHandler = require('../../../middleware/errorHandler')
const {BadRequestError} = require('../../../utils/error')

const Team = require('../../../models/Team')
const ParticipantTeam = require('../../../models/ParticipantTeam')

const createTeam = async(req,res) =>{
    try {
        //create-team
        const teamCode = require('../../../middleware/teamCode')
        const team_code = teamCode()
        const team = new Team({
        name:req.body.name,
        admin_id:req.participant._id,
        team_code,
        hack_id:req.params.id
        })
        console.log('here')
        console.log(team)
        await team.save()

        //create-participant-team-table
        const participantTeam = new ParticipantTeam({
        team_id:team._id,
        participant_id:req.participant._id
        })
        await participantTeam.save()
        res.status(201).send({team,participantTeam})
    } catch (e) {
        errorHandler(new BadRequestError,req,res)
    }
}

module.exports = createTeam