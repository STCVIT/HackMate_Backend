const express = require('express')

const errorHandler = require('../middleware/errorHandler')
const successHandler = require('../middleware/successHandler')
const authFunction = require('../middleware/auth')
const getUser = require('../middleware/getParticipant')

const { NotFoundError, BadRequestError } = require('../utils/error')
const { ResourceCreatedSuccess, ResourceDeletedSuccess } = require('../utils/success')

const router = express.Router()

const Team = require('../models/Team')
const TeamHack = require('../models/TeamHack')

router.post('/createTeam',authFunction,getUser,async(req,res)=>{
    const team = new Team({
        name:req.body.name,
        admin_id:req.participant._id
    })
    await team.save()
    const teamHack = new TeamHack({
        hack
    })
})