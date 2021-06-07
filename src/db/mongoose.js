const mongoose = require('mongoose')
const { Test ,Test2} = require('../models/Test')
const Participant=require('../models/Participant')
const mongodb = require('mongodb')
const object_id = mongodb.ObjectID
const path = require('path')
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
}).then(async()=>{
    // await Participant.init()
    await Test.init()
    console.log("running run")
    await run()
})

const run = async() =>{
    const session = await mongoose.startSession()
    await session.withTransaction(async()=>{
        try {
            const opts = { session };
            await Test.create([{
                //  _id: id1,
                 name: 'Deep',
            }], opts)

            await Test2.create([
                {
                    randomNum:8
               }
            ],opts)
                
        }catch(e){
            console.log(e)
            throw new Error("error aagaya vroo")
        }
        
        })
    session.endSession()
}
