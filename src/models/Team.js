const mongoose = require('mongoose')

const teamSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    admin_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
})
