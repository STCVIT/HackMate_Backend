const mongoose = require('mongoose')

const inviteSchema =new mongoose.Schema({
    participant_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    team_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
})

const Invite = mongoose.model('Invite',inviteSchema)
module.exports = Invite

