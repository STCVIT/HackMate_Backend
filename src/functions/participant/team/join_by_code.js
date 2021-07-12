const Team = require('../../../models/Team')
const participantTeam = require('../../../models/ParticipantTeam')
const Hack = require('../../../models/Hack')
const { TeamFullError } = require('../../../utils/error')
const errorHandler = require('../../../middleware/errorHandler')

//check same hack
const join_team_by_code = async(req,res)=>{
    try {
        const team = await Team.findOne({hack_id:req.params.hack_id,team_code:req.body.code})
        if(!team){
            return res.status(404).send('No team found!')
        }
        if(req.params.id!=null){
            const hack = await Hack.findById(req.params.id)
            const participants = await participantTeam.find({team_id:team._id})
            if(hack.max_team_size===participants.length){
                throw new TeamFullError
            }
        }
        const joinTeam = new participantTeam({
            team_id:team._id,
            participant_id:req.participant._id
        })
        await joinTeam.save()
        res.status(201).send(joinTeam)
        
    } catch (e) {
        errorHandler(e,req,res)
    }
    
}

module.exports = join_team_by_code