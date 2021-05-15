const mongoose = require('mongoose')

const roles = ['Coordinator','Mentor','Volunteer']

const memberSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    photo:{ 
        type:Buffer
    },
    phone:{
        type:String,
        required:true
    },
    hack_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    role:{
        type:String,
        enum: roles,
        required:true
    }
})

const Member = mongoose.model('Member',memberSchema)
module.exports = Member