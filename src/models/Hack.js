const mongoose = require('mongoose')

const hackSchema = mongoose.model({
    name:{
        type:String,
        required:true
    },
    poster:{ 
        type:Buffer
    },
    website:{
        type:String
    },
    venue:{
        type:String,
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
    organiser_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
})