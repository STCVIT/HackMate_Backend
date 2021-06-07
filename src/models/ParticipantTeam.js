const mongoose = require('mongoose')

const participantTeamSchema = new mongoose.Schema({
    participant_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    team_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    }
})

participantTeamSchema.index({participant_id:1,team_id:1},{unique:true})

const ParticipantTeam = mongoose.model('ParticipantTeam',participantTeamSchema)
module.exports = ParticipantTeam 