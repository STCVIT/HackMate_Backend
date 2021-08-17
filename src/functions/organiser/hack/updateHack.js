const errorHandler = require('../../../middleware/errorHandler')
const Hack = require('../../../models/Hack')
const { BadRequestError, NotFoundError } = require('../../../utils/error')

async function updateHack(req,res){
    const updates = Object.keys(req.body)
    const allowedUpdates=['name','website','venue','poster','prize_pool','start','end','max-team-size','min-team-size','mode_of_conduct']
    const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))
    if (!isValidOperation){
       return res.status(400).send('Invalid Updates!')
    }
    try {
          let hid = req.params.hack_id
          if(!hid || hid==( null || undefined)){
          return res.send('Send a Hack ID')
          }
         const hack = await Hack.findOne({_id:hid})
         if(!hack){
              return errorHandler(new NotFoundError,req,res)
         }
         updates.forEach((update)=>hack[update]=req.body[update])
         await hack.save()
         res.status(200).send(hack)
    } catch (error) {
         errorHandler(new BadRequestError,req,res)
    }
}

module.exports = updateHack