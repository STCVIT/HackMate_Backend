const Request = require('../../../models/Request')
const errorHandler = require('../../../middleware/errorHandler')
const {NotFoundError} = require('../../../utils/error')
const DN_Team = require('../../../models/Dn-Team')

//wrong
const myRequests = async(req,res)=>{
    try {
        let requests = []
        let i=0
        const teams = await DN_Team.find({admin_id:req.participant._id})
        teams.forEach(async(team)=>{
            const request = await Request.find({team_id:team._id})
            if(!request || request.length==0){
                i++
            }
            else{
                requests.push(request)
                i++  
            }
            if(i==teams.length){
                return res.status(200).send(requests)
            }
        })
    } catch (e) {
        
    }

    // try {
    //     const requests = await Request.find({participant_id:req.participant._id})
    //     if(!requests || requests.length==0){
    //         throw new NotFoundError
    //     }
    //     res.status(200).send(requests)
    // } catch (e) {
    //     errorHandler(e,req,res)
    // }
}

module.exports = myRequests