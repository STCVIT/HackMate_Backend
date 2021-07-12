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

const Team = require('../models/Team')
const ParticipantTeam = require('../models/ParticipantTeam')

const test = async() =>{
    const teams = await ParticipantTeam.aggregate([
        {$lookup: {
            from: 'teams', 
            localField: 'team_id', 
            foreignField: '_id', 
            as: 'team'}
        },
         {$unwind: {path: '$team'}},
        {$match: {'team.hack_id': '60c442520b9218673c7ee8e9'}}
    ])  
    console.log(teams) 
}
//test()



// var date = new Date("27 July 2019 13:30:00 GMT+05:30");
// console.log(date.getTime())


module.exports = router