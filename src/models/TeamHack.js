const mongoose = require('mongoose')

const teamHackSchema = mongoose.Schema({
    hack_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    team_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    project_github:{
        type:String,
    }
})

const TeamHack = mongoose.model('TeamHack',teamHackSchema)
module.exports = TeamHack 