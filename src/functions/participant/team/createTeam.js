const errorHandler = require('../../../middleware/errorHandler')
const {BadRequestError} = require('../../../utils/error')
const mongoose = require('mongoose')
require('../../../db/mongoose')

const Team = require('../../../models/Team')
const ParticipantTeam = require('../../../models/ParticipantTeam')

const createTeam = async(req,res) =>{
    const session = await mongoose.startSession()
    await session.withTransaction(async()=>{
        try {
            const opts = { session };

            //create-team
            const teamCode = require('../../../middleware/teamCode')
            const team_code = teamCode()
            const one = await Team.create([{
                name: req.body.name,
                admin_id:req.participant._id,
                team_code,
                hack_id:req.params.hack_id
            }], opts)
            console.log(one[0])
            const two = await ParticipantTeam.create([
                {
                team_id:one[0]._id,
                participant_id:req.participant._id    
               }
            ],opts)
                res.send({one,two})
        }catch(e){
            res.send('lmao')
            console.log(e)
            throw new Error("error aagaya vroo")
        }
        
        })
    session.endSession()
}

// const createTeam = async(req,res) =>{
//     try {
//         //create-team
//         const teamCode = require('../../../middleware/teamCode')
//         const team_code = teamCode()
//         const team = new Team({
//         name:req.body.name,
//         admin_id:req.participant._id,
//         team_code,
//         hack_id:req.params.id
//         })
//         console.log('here')
//         console.log(team)
//         await team.save()

//         //create-participant-team-table
//         const participantTeam = new ParticipantTeam({
//         //team_id:team._id,
//         participant_id:req.participant._id
//         })
//         await participantTeam.save()
//         res.status(201).send({team,participantTeam})
//     } catch (e) {
//         console.log(e)
//         errorHandler(new BadRequestError,req,res)
//     }
// }

module.exports = createTeam