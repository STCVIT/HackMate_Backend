const { NotFoundError, BadRequestError } = require("../../../utils/error");
const errorHandler = require("../../../middleware/errorHandler");

const removeMemberFromTeam = async (req, res) => {
  try {
    const team = req.team;
    let members = team.members.map((member) => member.uid);
    if (!members.includes(req.params.member_id)) {
      return errorHandler(new NotFoundError(), req, res);
    }
    let updatedMembers = team.members.filter((member) => {
      return member.uid != req.params.member_id;
    });
    team.members = updatedMembers;
    await team.save();
    res.status(200).send(team);
  } catch (e) {
    errorHandler(new BadRequestError(), req, res);
  }
};

module.exports = removeMemberFromTeam;
