const mongoose = require('mongoose')

const participantTeamSchema = mongoose.Schema({
    participant_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    team_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    }
})

const ParticipantTeam = mongoose.model('ParticipantTeam',participantTeamSchema)
module.exports = ParticipantTeam 