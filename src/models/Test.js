const mongoose = require('mongoose')

const test = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    randomNum:{
        type : Number,
        required : true
    }
    
})

const test2 = new mongoose.Schema({
    randomNum: {
        type: Number,
        required: true
    }
})

// test.virtual('count').get(()=>{
//     const abc = 8
//     return abc
// })

const Test = mongoose.model('Test',test)
const Test2 = mongoose.model('Test2',test2)
module.exports = {Test,Test2}