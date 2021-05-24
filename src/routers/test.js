const express = require('express')
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

module.exports = router