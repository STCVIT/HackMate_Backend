const {NotFoundError} = require('../../../utils/error')
const DN_Team = require('../../../models/Dn-Team')
const Participant = require('../../../models/Participant')
const errorHandler = require('../../../middleware/errorHandler')

const getAllParticipants = async(req,res)=>{
    try {
        let eligible=[]
        let length = 0
        if(req.params.hack_id=='null'){
            const participants = await Participant.find()
            if(!participants || participants.length==0){
                throw new NotFoundError
            }
            const page = Number(req.query.page)
            const start = (page-1)*12
            const limit = 12
            const end = start + limit
            const final = participants.slice(start,end)
            if(!final || final.length==0){
                errorHandler(new NotFoundError,req,res)
                return
            }
            length = participants.length
            return res.status(200).send({final,length})
        }
        else{
            const hackTeams = await DN_Team.find({hack_id:req.params.hack_id})
            if(!hackTeams || hackTeams.length==0){
                const participants = await Participant.find()
                if(!participants || participants.length==0){
                    throw new NotFoundError
                }
                const page = Number(req.query.page)
            const start = (page-1)*12
            const limit = 12
            const end = start + limit
            const final = participants.slice(start,end)
            if(!final || final.length==0){
                errorHandler(new NotFoundError,req,res)
                return
            }
            length = participants.length
            return res.status(200).send({final,length})
               
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
            const page = Number(req.query.page)
            const start = (page-1)*12
            const limit = 12
            const end = start + limit
            const final = participants.slice(start,end)
            if(!final || final.length==0){
                errorHandler(new NotFoundError,req,res)
                return
            }
            length = participants.length
            return res.status(200).send({final,length}) 
           
        }
    } catch (e) {
        errorHandler(e,req,res)
    }
}

module.exports = getAllParticipants