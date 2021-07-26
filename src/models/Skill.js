const mongoose = require('mongoose')

const skillsList = ['frontend','backend','ml','ui/ux','appdev','management','blockchain','cybersecurity']

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