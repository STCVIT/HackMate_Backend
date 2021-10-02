const participantModel = require("../models/Participant");
const Organiser = require("../models/Organiser");
const errorHandler = require("./errorHandler");
const { NotFoundError, BadRequestError } = require("../utils/error");

const getParticipant = async (req, res, next) => {
  try {
    const participant = await participantModel.findOne({ uid: req.userId });
    if (!participant) {
      return errorHandler(new NotFoundError(), req, res);
    }
    req.participant = participant;
    return next();
  } catch (e) {
    console.log(e);
    errorHandler(new BadRequestError(), req, res);
  }
};

const getOrganiser = async (req, res, next) => {
  try {
    const organiser = await Organiser.findOne({ uid: req.userId });
    if (!organiser) {
      return errorHandler(new NotFoundError(), req, res);
    }
    req.organiser = organiser;
    next();
  } catch (e) {
    console.log(e);
    errorHandler(new BadRequestError(), req, res);
  }
};

module.exports = { getParticipant, getOrganiser };
