const express = require('express')
require('dotenv').config({path: __dirname + '/.env'})
require('./src/db/mongoose')
const run = require('./src/middleware/auth')
const app = express()
const port = process.env.PORT || 3000

//const articleRouter = require('./src/routers/articleRouter')
const participantProfile = require('./src/routers/participantProfile')
const organiserProfile = require('./src/routers/organiserProfile')

const errorHandler = require('./src/middleware/errorHandler')
const { NotFoundError } = require('./src/utils/error')

app.use(express.json())

app.use('/participant',participantProfile)
app.use('/organiser',organiserProfile)



app.all('*',(req,res,next)=>{
    throw new NotFoundError()
})

app.use(errorHandler)

app.listen(port,()=>{
    console.log('Server is up on Port:', port)
})