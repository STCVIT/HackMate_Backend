const mongoose = require('mongoose')

const organiserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    logo:{ 
        type:Buffer
    },
    phone:{
        type:String,
        required:true
    },
    college:{
        type:String
    },
    uid:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    website:{
        type:String
    },
})

organiserSchema.virtual('hacks',{
    ref:'Hack',
    localField:'_id',
    foreignField:'organiser_id'
})

organiserSchema.methods.toJSON= function(){
    const organiser = this
    const organiserObject = organiser.toObject()

    delete organiserObject.__v
    delete organiserObject._id
    delete organiserObject.uid

    return organiserObject 
}

const Organiser = mongoose.model('Organiser',organiserSchema)
module.exports = Organiser