const {NotFoundError} = require('../../../utils/error')
const DN_Team = require('../../../models/Dn-Team')
const Participant = require('../../../models/Participant')
const errorHandler = require('../../../middleware/errorHandler')

const getAllParticipants = async(req,res)=>{
    try {
        let eligible=[]
        if(req.params.hack_id=='null'){
            const participants = await Participant.find()
            if(!participants || participants.length==0){
                throw new NotFoundError
            }
            res.status(200).send(participants)
        }
        else{
            const hackTeams = await DN_Team.find({hack_id:req.params.hack_id})
            if(!hackTeams || hackTeams.length==0){
                const participants = await Participant.find()
                if(!participants || participants.length==0){
                    throw new NotFoundError
                }
                res.status(200).send(participants)
            }
            let members = []
            let temp = hackTeams.map((team)=>{return team.members})
            temp.forEach(member => {
                member.forEach((doc)=>members.push(doc.uid))
            });
            const participants = await Participant.find({_id:{$nin:members}})
            if(participants.length==0 || !participants){
                throw new NotFoundError
            } 
            res.status(200).send(participants)
        }
    } catch (e) {
        errorHandler(e,req,res)
    }
}

module.exports = getAllParticipants