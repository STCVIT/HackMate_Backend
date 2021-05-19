
async function updateProfile(req,res){
const updates = Object.keys(req.body)
const allowedUpdates=['name','github','linkedIn','website','college','bio','photo','graduation_year','username']
const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))
if (!isValidOperation){
   return res.status(400).send('Invalid Updates!')
}
try {
     updates.forEach((update)=>req.participant[update]=req.body[update])
     await req.participant.save()

      res.send(req.participant)
} catch (error) {
    res.status(400).send(error)
}
}

module.exports = updateProfile