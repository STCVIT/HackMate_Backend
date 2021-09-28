const participantModel = require("../../../models/Participant");
const errorHandler = require("../../../middleware/errorHandler");
const {
  BadRequestError,
  SchemaValidationError,
} = require("../../../utils/error");

async function createProfile(req, res) {
  try {
    const participant = new participantModel({
      ...req.body,
      uid: req.userId,
      email: req.email,
    });
    await participant.save();
    res.status(201).send(participant);
  } catch (e) {
    if (e.code === 11000 || e._message) {
      errorHandler(new SchemaValidationError(), req, res);
    }
    errorHandler(new BadRequestError(), req, res);
  }
}

module.exports = createProfile;
