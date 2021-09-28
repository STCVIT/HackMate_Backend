const errorHandler = require("../../../middleware/errorHandler");
const Hack = require("../../../models/Hack");
const {
  BadRequestError,
  SchemaValidationError,
} = require("../../../utils/error");

async function createHack(req, res) {
  try {
    req.body.start = new Date(req.body.start);
    req.body.end = new Date(req.body.end);
    const hack = new Hack({
      ...req.body,
      organiser_id: req.organiser._id,
    });
    await hack.save();
    res.status(201).send(hack);
  } catch (e) {
    console.log(e);
    if (e._message == "Hack validation failed") {
      return errorHandler(new SchemaValidationError(), req, res);
    }
    if (e.statusCode && e.message) {
      return errorHandler(e, req, res);
    }
    errorHandler(new BadRequestError(), req, res);
  }
}

module.exports = createHack;
