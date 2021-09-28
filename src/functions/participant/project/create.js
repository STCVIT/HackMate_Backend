const errorHandler = require("../../../middleware/errorHandler");
const projectModel = require("../../../models/Project");
const {
  BadRequestError,
  SchemaValidationError,
} = require("../../../utils/error");

const createProject = async (req, res) => {
  try {
    const project = new projectModel({
      ...req.body,
      participant_id: req.participant._id,
    });
    await project.save();
    res.status(201).send(project);
  } catch (e) {
    if (e.code === 11000 || e._message) {
      return errorHandler(new SchemaValidationError(), req, res);
    }
    errorHandler(new BadRequestError(), req, res);
  }
};

module.exports = createProject;
