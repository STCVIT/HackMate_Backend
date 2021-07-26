const mongoose = require('mongoose')

const skillsList = ['frontend','backend','ml','ui/ux','appdev','management','blockchain','cybersecurity']

const skillVacancySchema = new mongoose.Schema({
    team_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    skill:{
        type:String,
        enum: skillsList,
        required:true
    }
}) 

const SkillVacancy = mongoose.model('SkillVacancie',skillVacancySchema)
module.exports = SkillVacancy