const errorHandler = require('../../../middleware/errorHandler')
const DN_Team = require('../../../models/Dn-Team')
const Hack = require('../../../models/Hack')
const { NotFoundError, BadRequestError } = require('../../../utils/error')

const myTeams = async(req,res) =>{
    try {
        const teams = await DN_Team.find({'members.uid':req.participant._id})
        if(!teams || teams.length==0){
            errorHandler(new NotFoundError,req,res)
            return
        }
        const page = Number(req.query.page)
        const start = (page-1)*8
        const limit = 8 
        const end = start + limit
        const length = teams.length
        const temp = teams.slice(start,end)
        if(!temp || temp.length==0){
            return res.send('Not found')
        }
        let final = []
        temp.forEach(async(team)=>{
            let hackName = ''
            if(team.hack_id){
                let hack = await Hack.findOne({_id:team.hack_id})
                hackName = hack.name
            }
            let temp_team = {
                team,
                hackName
            }
            final.push(temp_team)
        })
        res.status(200).send({final,length})
    } catch (e) {
        errorHandler(new BadRequestError,req,res)
    }
}

module.exports = myTeams