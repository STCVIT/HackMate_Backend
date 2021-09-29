const errorHandler = require("../../../middleware/errorHandler");
const paginate = require("../../../middleware/paginate");
const Hack = require("../../../models/Hack");
const DN_Team = require("../../../models/Dn-Team");
const { NotFoundError, BadRequestError } = require("../../../utils/error");
const participantModel = require("../../../models/Participant");

const getInterestedTeams = async (req, res) => {
  let final = [];
  try {
    let hid = req.params.hack_id;
    if (!hid || hid == null || hid == undefined) {
      return res.send("Send a Hack ID");
    }
    const page = Number(req.query.page);
    const hack = await Hack.find({ _id: hid, organiser_id: req.organiser._id });
    if (!hack) {
      return errorHandler(new NotFoundError(), req, res);
    }
    const teams = await DN_Team.find({ hack_id: hid });
    if (teams.length === 0 || !teams) {
      return errorHandler(new NotFoundError(), req, res);
    }
    let length = teams.length;
    const newTeams = paginate(teams, 12, page);
    if (!newTeams || newTeams.length == 0) {
      return errorHandler(new NotFoundError(), req, res);
    }

    await Promise.all(
      newTeams.map(async (team) => {
        let members = team.members.map((member) => member.uid);
        const participants = await participantModel.find({
          _id: { $in: members },
        });
        let temp = {
          team,
          participants,
        };
        final.push(temp);
      })
    );
    res.status(200).send({ final, length });
  } catch (e) {
    errorHandler(new BadRequestError(), req, res);
  }
};
//check this
module.exports = getInterestedTeams;

// let i = 0
// newTeams.forEach(async(team)=>{
//     let members = team.members.map((member)=>member.uid)
//     const participants = await participantModel.find({_id:{$in:members}})
//     let temp = {
//         team,
//         participants
//     }
//     final.push(temp)
//     i++
//     if(newTeams.length==i){
//         console.log(final)
//         res.status(200).send({final,length})
//     }
// })
