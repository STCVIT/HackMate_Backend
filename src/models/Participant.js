const mongoose = require('mongoose')
const privacyOptions=['all','none','team']

const participantSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    privacy:{
        type:String,
        enum:privacyOptions,
        default:'none'
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
    phone:{
        type:String,
        required:true
    },
    college:{
        type:String
    },
    address:{
        type:String,
        required:true
    },
    uid:{
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

participantSchema.methods.displayInfo = async function(){
    const participant = this
    const participantObject = participant.toObject()
   
    delete participantObject.phone
    delete participantObject.address
    delete participantObject.__v
    delete participantObject._id
    delete participantObject.uid
    delete participantObject.privacy
    
    return participantObject 
  
 }

const participantModel = mongoose.model('Participant',participantSchema)

module.exports = participantModel