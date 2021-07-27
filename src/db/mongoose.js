const mongoose = require('mongoose')
const models = require('../models/Models')
const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const DN_Team = require('../models/Dn-Team')
const Hack = require('../models/Hack')

mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
}).then(async()=>{
    await Promise.all(models.map((model) => model.init()));
})

// const abc = async()=>{
//     let hacks = []
//     let teams = await DN_Team.find()
//     for await (team of teams){
//         if(team.hack_id){
//             const hack = await Hack.findById(team.hack_id)
//             hacks.push(hack)
//         }
//     }
//     console.log(hacks)
// }

// abc()