const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    by_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    for_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    review:{
        type:String,
        required:true
    }
})

reviewSchema.index({by_id:1,for_id:1},{unique:true})

const reviewModel = mongoose.model('Review',reviewSchema)

module.exports = reviewModel