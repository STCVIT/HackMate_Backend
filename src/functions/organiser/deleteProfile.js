
async function deleteProfile(req,res,next){
    try { 
        await req.organiser.remove()
        next()
        }
        catch(e) {
         res.status(500).send(e)
     }
}

module.exports = deleteProfile