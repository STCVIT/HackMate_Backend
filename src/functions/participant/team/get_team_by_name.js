const Team = require('../../../models/Team')

const get_team_by_name = async(req,res)=>{
    try {
        const teams = await Team.find({hack_id:req.params.hack_id,name:req.body.name}).collation({locale:'en', strength:2})
        if(!teams || teams.length==0){
            return res.status(404).send('no teams found!')
        }
        res.status(200).send(teams)
    } catch (e) {
        res.send(e)
    }
    
} 

module.exports = get_team_by_name