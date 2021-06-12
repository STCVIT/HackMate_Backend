const mongoose = require('mongoose')
const { Test ,Test2} = require('../models/Test')

const getPopularHack = require('../routers/hack')
const models = require('../models/Models')
const path = require('path');
const Team = require('../models/Team');
const ParticipantTeam = require('../models/ParticipantTeam')
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
}).then(async()=>{
    await Promise.all(models.map((model) => model.init()));
})

//getPopularHack()

// const test = async() =>{
//     const session = await mongoose.startSession()
//     await session.withTransaction(async()=>{
//         try {
//             const opts = { session };
//             const one = await Test.create([{
//                  name: 'Deepdg',
//                  randomNum:9
//             }], opts)
//             console.log(one[0].randomNum)
//             const two = await Test2.create([
//                 {
//                     randomNum:one[0].randomNum
//                }
//             ],opts)
                
//         }catch(e){
//             console.log(e)
//             throw new Error("error aagaya vroo")
//         }
        
//         })
//     session.endSession()
// }

// test()


// const runOne = async(req,res) =>{
//     const session = await mongoose.startSession()
//     await session.withTransaction(async()=>{
//         try {
//             const opts = { session };

//             //create-team
//             const teamCode = require('../middleware/teamCode')
//             const team_code = teamCode()
//             const one = await Team.create([{
//                 name: req.body.name,
//                 admin_id:req.participant._id,
//                 team_code,
//                 hack_id:req.params.hack_id
//             }], opts)
//             console.log(one[0])
//             const two = await ParticipantTeam.create([
//                 {
//                 team_id:one[0]._id,
//                 participant_id:req.participant._id    
//                }
//             ],opts)
//                 res.send({one,two})
//         }catch(e){
//             res.send('lmao')
//             console.log(e)
//             throw new Error("error aagaya vroo")
//         }
        
//         })
//     session.endSession()
// }


// const createTeam = async(req,res) =>{
//     const session = await Team.startSession()
//     await session.withTransaction(async()=>{
//     try {
//         const opts = { session };
        

//         const team = await Team.create([{
//             name:req.body.name,
//             admin_id:req.participant._id,
//             team_code:'ABCDEF',
//             hack_id:req.params.id
//         }],opts)
//         console.log(team)
        
//         //create-participant-team-table
//         const participantTeam = await ParticipantTeam.create([{
//             team_id:team[0]._id,
//             participant_id:req.participant._id
//         }],opts)
        

//         res.status(201).send({team,participantTeam})
//     } catch (e) {
//         res.send('lmao')
//         console.log(e)
//         //errorHandler(new BadRequestError,req,res)
//     }
// })
// session.endSession()
// }

//module.exports = runOne