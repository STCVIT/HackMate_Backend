const express = require('express')
const createProject = require('../functions/participant/project/create')
const deleteProject = require('../functions/participant/project/delete')
const getAll = require('../functions/participant/project/getAll')
const getById = require('../functions/participant/project/getById')
const updateProject = require('../functions/participant/project/update')
const { checkUser, checkClaimParticipant } = require('../middleware/auth')
const { getParticipant } = require('../middleware/getUser')

const router = express.Router()

//update validation

//CREATE PROJECT
router.post('/create',checkUser,checkClaimParticipant,getParticipant,createProject)

//GET ALL PROJECTS
router.get('/getAll',checkUser,checkClaimParticipant,getParticipant,getAll)

//GET PROJECT BY ID
router.get('/get/:project_id',checkUser,checkClaimParticipant,getParticipant,getById)

//UPDATE PROJECT 
router.patch('/update/:project_id',checkUser,checkClaimParticipant,getParticipant,updateProject)

//DELETE PROJECT
router.delete('/delete/:project_id',checkUser,checkClaimParticipant,getParticipant,deleteProject)

module.exports = router