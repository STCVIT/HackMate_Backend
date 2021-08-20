const errorHandler = require("../../../middleware/errorHandler")
const { InvalidUpdatesError, BadRequestError } = require("../../../utils/error")

async function updateProfile(req,res){
    const updates = Object.keys(req.body)
    const allowedUpdates=['name','website','college','phone','logo']
    const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))
    if (!isValidOperation){
       return errorHandler(new InvalidUpdatesError,req,res)
    }
    try {
         updates.forEach((update)=>req.organiser[update]=req.body[update])
         await req.organiser.save()
         res.send(req.organiser)
    } catch (error) {
        errorHandler(new BadRequestError,req,res)
    }
}
    
module.exports = updateProfile