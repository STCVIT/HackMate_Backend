const mongoose = require('mongoose')

const requestSchema = mongoose.Schema({
    participant_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    team_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
})

const Request = mongoose.model('Request',requestSchema)
module.exports = Request