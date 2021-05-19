const mongoose = require('mongoose')

const participantSchema = mongoose.Schema({
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
        type:Buffer
    },
    college:{
        type:String
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

participantSchema.methods.toJSON= function(){
    const participant = this
    const participantObject = participant.toObject()

    delete participantObject.__v
    delete participantObject._id
    delete participantObject.uid

    return participantObject 
}

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