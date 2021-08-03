const express = require('express')
const getParticipantBySkills = require('../functions/participant/participant/geBySkills')
const getAllParticipants = require('../functions/participant/participant/getAll')
const getAllNull = require('../functions/participant/participant/getAllNull')
const getAllSkills = require('../functions/participant/participant/getAllSkills')

const getById = require('../functions/participant/participant/getById')
const getByUsername = require('../functions/participant/participant/getByUsername')
const { checkUser, checkClaimParticipant } = require('../middleware/auth')
const errorHandler = require('../middleware/errorHandler')
const { getParticipant } = require('../middleware/getUser')
const { BadRequestError } = require('../utils/error')

const router = express.Router()

//ask for teammates

//GET-ALL-PARTICIPANTS
router.get('/all/:hack_id',checkUser,checkClaimParticipant,getParticipant,(req,res)=>{
    try {
        if(req.params.hack_id != 'null'){
           getAllParticipants(req,res)
        }
        else{
            getAllNull(req,res)
        }  
    } catch (e) {
        errorHandler(new BadRequestError,req,res)
    }
    
})

//GET-BY-SKILLS
router.get('/skill/:hack_id',checkUser,checkClaimParticipant,getParticipant,(req,res)=>{
    try {
        if(req.params.hack_id != 'null'){
            getParticipantBySkills(req,res)
        }
        else{
            getAllSkills(req,res)
        }
    } catch (e) {
        errorHandler(new BadRequestError,req,res)
    }
    
})

//GET-BY-USERNAME
router.get('/userName/:hack_id',checkUser,checkClaimParticipant,getParticipant,getByUsername)

//GET-BY-ID
router.get('/:participant_id',checkUser,checkClaimParticipant,getParticipant,getById)

module.exports = router

// //GET-ALL-FOR-NULL-HACK
// router.get('/allNull',checkUser,checkClaimParticipant,getParticipant,getAllNull)

// //GET-ALL-SKILLED-FOR-NULL-HACK
// router.get('/skillNull',checkUser,checkClaimParticipant,getParticipant,getAllSkills)

// //GET-ALL-PARTICIPANTS
// router.get('/all/:hack_id',checkUser,checkClaimParticipant,getParticipant,getAllParticipants)

// //GET-BY-SKILLS
// router.get('/skill/:hack_id',checkUser,checkClaimParticipant,getParticipant,getParticipantBySkills)