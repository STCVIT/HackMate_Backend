const DN_Team = require('../../../models/Dn-Team')
const reviewModel = require('../../../models/Review')

const postReview = async(req,res) => {
    try {
        const by = await DN_Team.findOne({team_id:req.params.team_id,participant_id:req.participant._id})
        const to = await DN_Team.findOne({team_id:req.params.team_id,participant_id:req.params.for_id})
        if(to && by){
            const check = await reviewModel.find({by_id:req.participant._id,for_id:req.params.for_id})
            if(check){
                check.review = req.body.review
                await check.save()
                return res.status(200).send('Review Updated')
            }
            const review = new reviewModel({
                ...req.body,
                by_id:req.participant._id,
                for_id:req.params.for_id
            })
            await review.save()
            return res.status(201).send('Review Submitted!')
        }
        else{
            res.status(400).send('Cannot review a participant who is not a team-mate')
        }
    } catch (e) {
        res.status(400).send(e)
    }
}

module.exports = postReview