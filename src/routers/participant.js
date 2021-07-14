const Participant = require('../models/Participant')
const DN_Team = require('../models/Dn-Team')
const express = require('express')
const { checkUser, checkClaimParticipant } = require('../middleware/auth')
const { getParticipant } = require('../middleware/getUser')
const { NotFoundError } = require('../utils/error')
const errorHandler = require('../middleware/errorHandler')
const Skill = require('../models/Skill')
//const participantModel = require('../models/Participant')
const router = express.Router()

//GET-ALL-PARTICIPANTS
router.get('/all/:hack_id',checkUser,checkClaimParticipant,getParticipant,getAllParticipants)

//GET-BY-SKILLS
router.get('/skill/:skill/:hack_id',checkUser,checkClaimParticipant,getParticipantBySkills)

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

const getParticipantBySkills = async(req,res) => {
    const hackTeams = await DN_Team.find({hack_id:req.params.hack_id})
    if(!hackTeams || hackTeams.length==0){
        const skills = await Skill.find({skill:req.params.skill})
        let skillParticipants = skills.map((skill)=>{return skill.participant_id})
        const participants = await Participant.find({_id:{$in:skillParticipants}})
        if(!participants || participants.length==0){
            throw new NotFoundError
        }
        return res.status(200).send(participants)
    }
    else{
        let members = []
        let temp = hackTeams.map((team)=>{return team.members})
        temp.forEach(member => {
            member.forEach((doc)=>members.push(doc.uid))
        });
        const skills = await Skill.find({skill:req.params.skill})
        let skillParticipants = skills.map((skill)=>{return skill.participant_id})
        let hack = new Set(members)
        let eligibleParticipants = skillParticipants.filter(sp=>!hack.has(sp))
        const answer = await Participant.find({_id:{$in:eligibleParticipants}})
        res.status(200).send(answer)

    }
    
}