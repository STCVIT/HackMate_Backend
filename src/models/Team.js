const mongoose = require('mongoose')

const teamSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    team_code: {
        type: String,
        required: true,
    },
    project_name: {
        type: String
    },
    project_description: {
        type: String
    },
    link_1: {
        type: String
    },
    link_2: {
        type: String
    },
    link_3: {
        type: String
    },
    hack_id: {
        type: mongoose.Schema.Types.ObjectId,
        Ref: 'Hack'
    }
})
