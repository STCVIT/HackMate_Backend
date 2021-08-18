
async function deleteProfile(req,res,next){
    try { 
        await req.organiser.remove()
        next()
        }
        catch(e) {
         res.status(400).send(e)
     }
}

module.exports = deleteProfile