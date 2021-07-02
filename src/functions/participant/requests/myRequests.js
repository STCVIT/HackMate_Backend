const Request = require('../../../models/Request')
const errorHandler = require('../../../middleware/errorHandler')
const {NotFoundError} = require('../../../utils/error')

const myRequests = async(req,res)=>{
    try {
        const requests = await Request.find({participant_id:req.participant._id})
        if(!requests || requests.length==0){
            throw new NotFoundError
        }
        res.status(200).send(requests)
    } catch (e) {
        errorHandler(e,req,res)
    }
}

module.exports = myRequests