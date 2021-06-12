const Team = require('../../../models/Team')
const Hack = require('../../../models/Hack')

const getPopularHack = async(req,res) =>{
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
           res.status(200).send(popularHacks)
        }
    })
}

module.exports = getPopularHack