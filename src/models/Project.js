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
    link_1:{
        type: String,
        required: true
    },
    link_2:{
        type: String,
    },
    link_3:{
        type: String,
    },
    owner_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
})

const projectModel = mongoose.model('Project',projectSchema)

module.exports = projectModel