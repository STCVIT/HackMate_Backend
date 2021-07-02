const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
    participant_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    team_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
})

requestSchema.index({participant_id:1,team_id:1},{unique:true})

const Request = mongoose.model('Request',requestSchema)
module.exports = Request