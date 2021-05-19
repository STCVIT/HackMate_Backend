const mongoose = require('mongoose')

const organiserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    logo:{ 
        type:Buffer
    },
    phone:{
        type:String,
        required:true
    },
    college:{
        type:String
    },
    uid:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    website:{
        type:String
    },
})

const Organiser = mongoose.model('Organiser',organiserSchema)
module.exports = Organiser