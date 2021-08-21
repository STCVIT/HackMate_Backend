const errorHandler = require("../../../middleware/errorHandler")
const { InvalidUpdatesError, BadRequestError } = require("../../../utils/error")

async function updateProfile(req,res){
const updates = Object.keys(req.body)
const allowedUpdates=['name','github','linkedIn','website','college','bio','photo','graduation_year','username']
const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))
if (!isValidOperation){
   return errorHandler(new InvalidUpdatesError,req,res)
   //return res.status(400).send('Invalid Updates!')
}
try {
     updates.forEach((update)=>req.participant[update]=req.body[update])
     await req.participant.save()
      res.status(200).send(req.participant)
} catch (error) {
    errorHandler(new BadRequestError,req,res)
    //res.status(400).send(error)
}
}

module.exports = updateProfile