const mongoose = require('mongoose')

const Participant=require('../models/Participant')

const path = require('path')
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });


mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
}).then(async()=>{
    await Participant.init()
})
