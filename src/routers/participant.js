const Participant = require('../models/Participant')
const ParticipantTeam = require('../models/ParticipantTeam')
const express = require('express')
const { checkUser, checkClaimParticipant } = require('../middleware/auth')
const { getParticipant } = require('../middleware/getUser')
const { NotFoundError } = require('../utils/error')
const router = express.Router()

//GET-ALL-PARTICIPANTS
router.post('/all/:hack_id',checkUser,checkClaimParticipant,getParticipant,)

const getAllParticipants = async(req,res)=>{
    try {
        const participants = await Participant.find()
        const eligible=[]
        if(req.params.hack_id=='null'){
            if(!participants || participants.length==0){
                throw new NotFoundError
            }
            res.status(200).send(participants)
        }
        else{
            participants.forEach(async(participant)=>{
                const pt = await ParticipantTeam.find({participant_id:participant._id,hack_id:req.params.hack_id})
            })
        }
    } catch (e) {
        
    }
}