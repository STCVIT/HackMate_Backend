const mongoose = require('mongoose')

const skillsList = []

const skillSchema = new mongoose.Schema({
    participant_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    skill:{
        type:String,
        enum: skillsList,
        required:true
    }
}) 

const Skill= mongoose.model('Skill',skillSchema)
module.exports = Skill