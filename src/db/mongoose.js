const mongoose = require('mongoose')
const Test = require('../../src/models/Test')
const Participant=require('../models/Participant')

const path = require('path')
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

// const dbConn = async()=>{
mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
}).then(async()=>{
    await Participant.init()
})
//     const session = await mongoose.startSession()
//     await session.startTransaction()

//     try {
//         const one = new Test({_id:'alkd12345678',name:'Deep'},{session});
//         const two = new Test({ _id:'lkc012345678',nae: 4},{session});
//         await one.save()
//         await two.save()
//         console.log('hi')
//         await session.commitTransaction()
//         session.endSession()
//     } catch (e) {
//        await session.abortTransaction()
//         session.endSession()
//         console.log(e)
//     }

// })
///module.exports = connection
