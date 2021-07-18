const paginate = require('../../../middleware/paginate')
const DN_Team = require('../../../models/Dn-Team')
const Hack = require('../../../models/Hack')

const getPopularHack = async(req,res) =>{
    const page = Number(req.query.page)
    const now = new Date(Date.now())
    const hacks = await Hack.find({start:{$gt:now}})
    console.log(hacks)
    let length = hacks.length
    let popularHacks =[];
    let i = 0
    if(length==0){
        return res.status(404).send('Not Found')
    }
        hacks.forEach(async(hack)=>{
        const teams = await DN_Team.find({hack_id:hack._id})
        let countArr = [
            hack,
            teams.length
        ]
        popularHacks.push(countArr) 
        i++
        if (i==length){
            popularHacks.sort(function(a,b){return b[1]-a[1]})
            const newPopularHacks = paginate(popularHacks,6,page)
            if(newPopularHacks.length==0){
                return res.status(404).send('not found')
            }
            console.log(newPopularHacks)
            const final = newPopularHacks.map((hack)=>hack[0])
           res.status(200).send({final,length})
        }
    })
}

module.exports = getPopularHack