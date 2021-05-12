const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    by:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:''
    },
    for:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:''
    },
    review:{
        type:String,
        required:true
    }
})

const reviewModel = mongoose.model('Review',reviewSchema)

module.exports = reviewModel