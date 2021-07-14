const mongoose = require('mongoose')

const mode_of_conduct_options = ['Online','Offline']

const hackSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    poster:{ 
        type:String
    },
    website:{
        type:String,
        required:true
    },
    venue:{
        type:String,
        required:true
    },
    mode_of_conduct:{
        type:String,
        enum:mode_of_conduct_options,
        required:true
    },
    start:{
        type:Date,
        required:true
    },
    end:{
        type:Date,
        required:true
    },
    max_team_size:{
        type:Number,
        required:true
    },
    min_team_size:{
        type:Number,
        required:true
    },
    organiser_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Organiser'
    },
    prize_pool:{
        required:true,
        type: Number 
    },
    description:{
        required:true,
        type:String
    }
})

const Hack = mongoose.model('Hack',hackSchema)
module.exports = Hack