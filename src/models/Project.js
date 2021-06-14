const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    code:{
        type: String,
    },
    design:{
        type: String,
    },
    demonstration:{
        type: String,
    },
    participant_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
})

const projectModel = mongoose.model('Project',projectSchema)

module.exports = projectModel