const express = require('express')

const articleModel = require('../models/Review')

const errorHandler = require('./../middleware/errorHandler')
const successHandler = require('./../middleware/successHandler')
const authFunction = require('./../middleware/auth')

const { NotFoundError, BadRequestError } = require('./../utils/error')
const { ResourceCreatedSuccess, ResourceDeletedSuccess } = require('./../utils/success')


const router = new express.Router()

// Get Articles based on Domain
router.get('/getArticle/:domain',async (req,res)=>{
    try{
        if(req.params.domain){
            const tempArticles = await articleModel.find({domain: req.params.domain})
            if(!tempArticles||tempArticles.length==0){
                throw new NotFoundError    
            }
            res.status(200).send(tempArticles)
        }
        else{
            throw new NotFoundError
        }
    }
    catch(e){
        errorHandler(e,req,res)
    }
})

//Post Article to Database
router.post('/postArticle',authFunction, async (req,res)=>{
    try{
        const tempArticle = new articleModel({
            ...req.body
        })
        await tempArticle.save()
        const success = new ResourceCreatedSuccess()
        successHandler(success,res)
    }
    catch(e){
        errorHandler(BadRequestError,req,res)
    }       
})

//Delete Article From Database
router.delete('/deleteArticle/:ID', authFunction, async (req,res)=>{
    try{
        await articleModel.deleteOne({_id: req.params.id})
        const success = new ResourceDeletedSuccess()
        successHandler(success,res)
    }
    catch(e){
        errorHandler(BadRequestError,req,res)
    } 
})

module.exports = router