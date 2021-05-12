const express = require('express')

const participantModel = require('../models/Participant')

const errorHandler = require('../middleware/errorHandler')
const successHandler = require('../middleware/successHandler')
const authFunction = require('../middleware/auth')

const { NotFoundError, BadRequestError } = require('../utils/error')
const { ResourceCreatedSuccess, ResourceDeletedSuccess } = require('../utils/success')

const router = express.Router()

const getUser = require('../middleware/getParticipant')

router.post('/',authFunction,async(req,res)=>{
    try{
        
        console.log(req.userId)
        const participant = new participantModel({
           ...req.body,
           uid:req.userId,
           email:req.email
        })
        console.log(participant)
        await participant.save()
        
        const success = new ResourceCreatedSuccess
        successHandler(success,res)
    }
    catch(e){
        errorHandler(BadRequestError,req,res)
    }  
})
router.get('/',authFunction ,getUser, async (req,res)=>{
    try{
            const participant = req.participant
            if(!participant){
                throw new NotFoundError
            }
            else{
            res.status(200).send(participant)
        }
    }
    catch(e){
        errorHandler(e,req,res)
    }
})
router.get('/privacy',authFunction,getUser,async (req,res)=>{
    
    try{
        
          const participant = req.participant
          const info = await participant.displayInfo()
          console.log('hi')
          res.status(200).send(info)
        }
    catch(e){
        errorHandler(e,req,res)
    }
})
router.patch('/',authFunction,getUser,async(req,res)=>{
    const updates = Object.keys(req.body)
    try {
       const participant = req.participant
         
       updates.forEach((update)=>participant[update]=req.body[update])

       await participant.save()

          res.send(participant)
    } catch (error) {
        res.status(400).send(error)
    }

})
 
router.delete('/',authFunction, async(req,res)=>{
    try {
        
       await req.user.remove()
       res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})
module.exports=router