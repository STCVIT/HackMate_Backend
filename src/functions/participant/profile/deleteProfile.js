
async function deleteProfile(req,res,next){
    try { 
        await req.participant.remove()
        next()
        }
        catch(e) {
         res.status(500).send(e)
     }
}

module.exports = deleteProfile