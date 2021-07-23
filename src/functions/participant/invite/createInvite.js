const Invite = require('../../../models/Invite')
const DN_Team = require('../../../models/Dn-Team')

const createInvite = async(req,res)=>{
    try {
        const check = await DN_Team.findOne({_id:req.params.team_id,'members.uid':req.params.participant_id})
        if(check){
            return res.status(400).send('Already in team')
        }
        const invite = new Invite({
            team_id:req.params.team_id,
            participant_id:req.params.participant_id
        })
        await invite.save()
        res.status(201).send('Invite was sent successfully!')    
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
}

module.exports = createInvite