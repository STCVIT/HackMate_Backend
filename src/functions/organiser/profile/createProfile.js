const Organiser = require("../../../models/Organiser");
const errorHandler = require("../../../middleware/errorHandler");
const {
  BadRequestError,
  SchemaValidationError,
} = require("../../../utils/error");

async function createProfile(req, res) {
  try {
    const organiser = new Organiser({
      ...req.body,
      uid: req.userId,
      email: req.email,
    });
    await organiser.save();
    res.status(201).send(organiser);
  } catch (e) {
    if (e.code === 11000 || e._message) {
      return errorHandler(new SchemaValidationError(), req, res);
    }
    errorHandler(new BadRequestError(), req, res);
  }
}

module.exports = createProfile;
