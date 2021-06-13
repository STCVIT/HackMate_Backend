const express = require('express')
require('dotenv').config()
require('./src/db/mongoose')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000

//const articleRouter = require('./src/routers/articleRouter')
const participantProfile = require('./src/routers/participantProfile')
const organiserProfile = require('./src/routers/organiserProfile')
const organiserHack = require('./src/routers/organiserHack')
const participantTeam = require('./src/routers/participantTeam')
const hack = require('./src/routers/hack')

const errorHandler = require('./src/middleware/errorHandler')
const { NotFoundError } = require('./src/utils/error')

app.use(express.json())
app.use(cors())

app.use('/participant',participantProfile)
app.use('/organiser',organiserProfile)
app.use('/organiser',organiserHack)
app.use('/team',participantTeam)
app.use('/getHacks',hack)


app.all('*',(req,res,next)=>{
    throw new NotFoundError()
})

app.use(errorHandler)

// app.get('/',(req,res)=>{
//     res.status(300).send('lol')
// })

app.listen(port,()=>{
    console.log('Server is up on Port:', port)
})