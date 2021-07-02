const express = require('express')
const { database } = require('firebase-admin')
const Hack = require('../models/Hack')

const router = express.Router()

router.get('/search/:name',async(req,res)=>{
    try {
        const hack = await Hack.find({name:req.params.name}).collation({locale:'en', strength:2})
        res.send(hack)
    } catch (e) {
        res.send('oof ni chala')
    }
    
})

const checkdate =()=>{
    let start = '2021-06-09'
    let end = '2021-06-10'
    let startDate = new Date(start)
    let endDate = new Date(end)
    console.log(startDate)
    console.log(endDate)
    let date = '2021-07-22'
    const trueDate = new Date(date)
    const now =  Date.now()
    const now_true = new Date(now)
    
    //conditions 
    if(a>b){

    }
}
//checkdate()

//TO-DO-LIST

//profile picture azure(3)

//skills=>test
//projects_team=>add/update dekho

//projects_personal=>test
//transaction control in skill vacancy

//reviews

//get participant (ML?) by username/domain

//send request+invite
//accept,reject req,invite

//get interested teams (hack)

//notifications??


module.exports = router