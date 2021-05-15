const mongoose = require('mongoose')

const skillsList = []

const skillSchema = mongoose.Schema({
    team_id:{
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