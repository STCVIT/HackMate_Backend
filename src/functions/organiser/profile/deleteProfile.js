const errorHandler = require("../../../middleware/errorHandler")
const { BadRequestError } = require("../../../utils/error")

async function deleteProfile(req,res,next){
    try { 
        await req.organiser.remove()
        next()
        }
        catch(e) {
         //errorHandler(new BadRequestError,req,res)   
         res.status(400).send(e)
     }
}

module.exports = deleteProfile