const mongoose = require('mongoose')
const DN_Team = require('./Dn-Team')
const Invite = require('./Invite')
const projectModel = require('./Project')
const Request = require('./Request')
const reviewModel = require('./Review')
const Skill = require('./Skill')

const participantSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    name:{
        type:String,
        required:true
    },
    github:{
        type:String,
        required:true
    },
    linkedIn:{
        type:String,
        required:true
    },
    website:{
        type:String
    },
    photo:{ 
        type:String
    },
    college:{
        type:String,
        required:true
    },
    uid:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    graduation_year:{
        type:Number,
        required:true
    },
    bio:{
        type:String,
        required:true
    }
})

participantSchema.post('remove',async function (doc,next){
    const participant = this
    console.log(doc)
    try {
        const myTeams = await DN_Team.find({'members.uid':participant._id, admin_id:{$ne:participant._id}})
        const myAdminTeams = await DN_Team.find({'members.uid':participant._id, admin_id:participant._id})
        await Promise.all(myAdminTeams.map((team)=>team.remove()))
        // myTeams.forEach(async(team)=>{
        //    let members = team.members.filter((member)=>{return member.uid != participant._id})
        //    team.members = members
        //     await team.save()
        // })
    await Promise.all(myTeams.map(async(team)=>{
        let members = team.members.filter((member)=>{return member.uid != participant._id})
        team.members = members
        await team.save()
    }))
    const skills = await Skill.find({participant_id:participant._id})
    await Promise.all(skills.map((skill)=>skill.remove()))
    const projects = await projectModel.find({participant_id:participant._id})
    await Promise.all(projects.map((project)=>project.remove()))
    const reviews = await reviewModel.find({by_id:participant._id})
    await Promise.all(reviews.map((review)=>review.remove()))
        next()
    } catch (e) {
        next(e)    
    }
    
    
})

// participantSchema.methods.toJSON= function(){
//     const participant = this
//     const participantObject = participant.toObject()

//     delete participantObject.__v
//     delete participantObject._id
//     delete participantObject.uid

//     return participantObject 
// }

// participantSchema.methods.displayInfo = async function(){
//     const participant = this
//     const participantObject = participant.toObject()
   
//     delete participantObject.phone
//     delete participantObject.address
//     delete participantObject.__v
//     delete participantObject._id
//     delete participantObject.uid
//     delete participantObject.privacy
    
//     return participantObject 
  
//  }

const participantModel = mongoose.model('Participant',participantSchema)

module.exports = participantModel