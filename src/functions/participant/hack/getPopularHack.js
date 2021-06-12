const Team = require('../../../models/Team')
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
    eligibleHacks.forEach(async(hack)=>{
        const teams = await Team.find({hack_id:hack._id})
        let countArr = [
            hack,
            teams.length
        ]
        popularHacks.push(countArr) 
        i++
        if (i==eligibleHacks.length){
            popularHacks.sort(function(a,b){return b[1]-a[1]})
            const newPopularHacks = popularHacks.slice(start,end)
           res.status(200).send(newPopularHacks)
        }
    })
}

module.exports = getPopularHack