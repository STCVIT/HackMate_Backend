const errorHandler = require("../../../middleware/errorHandler");
const Hack = require("../../../models/Hack");
const { NotFoundError, BadRequestError } = require("../../../utils/error");

async function deleteHack(req, res) {
  try {
    let hid = req.params.hack_id;
    if (!hid || hid == null || hid == undefined) {
      return res.status(418).send("Send a Hack ID");
    }
    const hack = await Hack.findOne({
      _id: hid,
      organiser_id: req.organiser._id,
    });
    if (!hack) {
      return errorHandler(new NotFoundError(), req, res);
    }
    await hack.remove();
    res.status(200).send(hack);
  } catch (e) {
    errorHandler(new BadRequestError(), req, res);
  }
}

module.exports = deleteHack;
