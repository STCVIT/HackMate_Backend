const DN_Team = require('../../../models/Dn-Team')
const Hack = require('../../../models/Hack')

const getPopularHack = async(req,res) =>{
    const page = Number(req.query.page)
        const start = (page-1)*6
        const limit = 6 
        const end = start + limit
    const now = new Date(Date.now())
    const hacks = await Hack.find()
    let popularHacks =[];
    const eligibleHacks = hacks.filter((hack)=>{
        if (hack.start>now){
            console.log(hack.start)
            return hack
        }
    })
    let i = 0
    if(eligibleHacks.length==0){
        return res.status(404).send('Not Found')
    }
    eligibleHacks.forEach(async(hack)=>{
        const teams = await DN_Team.find({hack_id:hack._id})
        let countArr = [
            hack,
            teams.length
        ]
        popularHacks.push(countArr) 
        i++
        if (i==eligibleHacks.length){
            popularHacks.sort(function(a,b){return b[1]-a[1]})
            const newPopularHacks = popularHacks.slice(start,end)
            if(newPopularHacks.length==0){
                return res.status(404).send('Not Found')
            }
            console.log(newPopularHacks)
            newPopularHacks.forEach(hack=> console.log(hack[0]))
            const final = newPopularHacks.map((hack)=>hack[0])
           res.status(200).send(final)
        }
    })
}

module.exports = getPopularHack