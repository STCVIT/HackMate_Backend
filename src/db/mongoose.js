const mongoose = require('mongoose')

const Participant=require('../models/Participant')

const path = require('path')
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

// const dbConn = async()=>{
const conn = mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true, 
    // useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
}).then(async()=>{
    await Participant.init()
})

module.exports = conn
