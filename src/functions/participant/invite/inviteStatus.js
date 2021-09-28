const Invite = require("../../../models/Invite");
const DN_Team = require("../../../models/Dn-Team");
const Hack = require("../../../models/Hack");
const errorHandler = require("../../../middleware/errorHandler");
const {
  TeamFullError,
  BadRequestError,
  NotFoundError,
} = require("../../../utils/error");

const inviteStatus = async (req, res) => {
  try {
    const invite = await Invite.findOne({
      _id: req.params.inv_id,
      participant_id: req.participant._id,
    });
    if (!invite) {
      return errorHandler(new NotFoundError(), req, res);
    }
    const team = await DN_Team.findOne({ _id: invite.team_id });
    if (!team) {
      return errorHandler(new NotFoundError(), req, res);
    }
    if (req.params.status == "accepted") {
      team.members.push({ uid: req.participant._id });
      await team.save();
      await invite.remove();
      return res.status(201).send(team);
    } else if (req.params.status == "rejected") {
      await invite.remove();
      return res.status(201).send("rejected");
    }
  } catch (e) {
    console.log(e);
    if (e.message && e.statusCode) {
      return errorHandler(e, req, res);
    } else {
      return errorHandler(new BadRequestError(), req, res);
    }
  }
};

module.exports = inviteStatus;
