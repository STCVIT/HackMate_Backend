const projectModel = require("../../../models/Project");
const errorHandler = require("../../../middleware/errorHandler");
const {
  NotFoundError,
  InvalidUpdatesError,
  BadRequestError,
  SchemaValidationError,
} = require("../../../utils/error");

async function updateProject(req, res) {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "name",
    "description",
    "code",
    "design",
    "demonstration",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return errorHandler(new InvalidUpdatesError(), req, res);
  }
  try {
    const project = await projectModel.findOne({
      _id: req.params.project_id,
      participant_id: req.participant._id,
    });
    if (!project) {
      return errorHandler(new NotFoundError(), req, res);
    }
    updates.forEach((update) => (project[update] = req.body[update]));
    await project.save();
    res.send(project);
  } catch (error) {
    if (e.code === 11000 || e._message) {
      errorHandler(new SchemaValidationError(), req, res);
    }
    errorHandler(new BadRequestError(), req, res);
  }
}

module.exports = updateProject;
