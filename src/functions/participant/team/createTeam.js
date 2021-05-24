const errorHandler = require('../../../middleware/errorHandler')
const {BadRequestError} = require('../../../utils/error')

const Team = require('../../../models/Team')
const ParticipantTeam = require('../../../models/ParticipantTeam')

const createTeam = async(req,res) =>{
    try {
        //create-team
        const teamCode = require('../../../middleware/teamCode')
        const team = new Team({
        name:req.body.name,
        admin_id:req.participant._id,
        code:teamCode(),
        hack_id:req.params.id
        })
        await team.save()

        //create-participant-team-table
        const participantTeam = new ParticipantTeam({
        hack_id:req.params.id,
        participant_id:req.participant._id
        })
        await participantTeam.save()
        res.status(201).send({team,participantTeam})
    } catch (e) {
        errorHandler(new BadRequestError,req,res)
    }
}

module.exports = createTeam