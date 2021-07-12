const mongoose = require('mongoose')
const Test = require('./Test')

const teamSchema = new mongoose.Schema({
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
        unique:true
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
        ref: 'Hack',
        default: null
    },
    //members = [
        //     {uid:'userid'},
        //     {uid:'userid'},
 // ]
                    
})

//index({members.uid:1,hack_id:1},{u:t})
//teamSchema.index({name:1,hack_id:1},{unique:true})

const Team = mongoose.model('Team',teamSchema)
module.exports = Team