const mongoose = require('mongoose')

const test = mongoose.Schema({
    name:{
        type:String
    }
})

const Test = mongoose.model('Test',test)
module.exports = Test