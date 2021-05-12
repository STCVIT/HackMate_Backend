const express = require('express')
require('dotenv').config({path: __dirname + '/.env'})
require('./src/db/mongoose')
const run = require('./src/middleware/auth')
const app = express()
const port = process.env.PORT || 3000

const articleRouter = require('./src/routers/articleRouter')
const participantRouter = require('./src/routers/participantProfile')

const errorHandler = require('./src/middleware/errorHandler')
const { NotFoundError } = require('./src/utils/error')

app.use(express.json())

app.use(articleRouter)
app.use(participantRouter)

app.post('/testIdToken',run,(req,res)=>{
    res.send({
        message:'your mail has been verified.'
    })
})

app.all('*',(req,res,next)=>{
    throw new NotFoundError()
})

app.use(errorHandler)

app.listen(port,()=>{
    console.log('Server is up on Port:', port)
})