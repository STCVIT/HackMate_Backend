//team.check()

const errorHandler = require("../../../middleware/errorHandler");
const {
  InvalidUpdatesError,
  BadRequestError,
  DuplicateTeamNameError,
} = require("../../../utils/error");

const updateTeam = async (req, res) => {
  const team = req.team;
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "code",
    "design",
    "demonstration",
    "hack_id",
    "project_description",
    "project_name",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return errorHandler(new InvalidUpdatesError(), req, res);
  }
  try {
    updates.forEach((update) => (team[update] = req.body[update]));
    await team.save();
    res.send(team);
  } catch (error) {
    console.log(error);
    if (error.code == 11000) {
      return errorHandler(new DuplicateTeamNameError(), req, res);
    }
    errorHandler(new BadRequestError(), req, res);
  }
};

module.exports = updateTeam;
