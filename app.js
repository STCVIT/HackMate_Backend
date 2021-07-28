const express = require('express')
require('dotenv').config()
require('./src/db/mongoose')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000

const participantProfile = require('./src/routers/participantProfile')
const organiserProfile = require('./src/routers/organiserProfile')
const organiserHack = require('./src/routers/organiserHack')
// const participantTeam = require('./src/routers/participantTeam')
const hack = require('./src/routers/hack')
const skills = require('./src/routers/skills')
const project = require('./src/routers/project')
const request = require('./src/routers/request')
const invite = require('./src/routers/invite')
const review = require('./src/routers/review')
const Dn_Team = require('./src/routers/DN_team')
const participant = require('./src/routers/participant')

const errorHandler = require('./src/middleware/errorHandler')
const { NotFoundError } = require('./src/utils/error')


app.use(express.json())
app.use(cors())

app.use('/participant',participantProfile)
app.use('/organiser',organiserProfile)
app.use('/organiser',organiserHack)
app.use('/getHacks',hack)
app.use('/skills',skills)
app.use('/projects',project)
app.use('/invites',invite)
app.use('/requests',request)
app.use('/review',review)
app.use('/DN_Team',Dn_Team)
app.use('/participant/get',participant)

app.all('*',(req,res,next)=>{
    throw new NotFoundError
})

app.use(errorHandler)

module.exports = app

