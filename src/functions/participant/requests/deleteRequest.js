const Request = require("../../../models/Request")

const deleteRequest = async(req,res)=>{
    try {
        const request = await Request.findOne({_id:req.params.req_id,participant_id:req.participant._id})
        if(!request){
            return res.status(401).send('unauthorized')
        }
        await request.remove()
        res.status(200).send(request)
    } catch (e) {
        res.status(400).send(e)
    }
}

module.exports = deleteRequest