const errorHandler = require("../../../middleware/errorHandler");
const {
  InvalidUpdatesError,
  BadRequestError,
  SchemaValidationError,
} = require("../../../utils/error");

async function updateProfile(req, res) {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "name",
    "github",
    "linkedIn",
    "website",
    "college",
    "bio",
    "photo",
    "graduation_year",
    "username",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return errorHandler(new InvalidUpdatesError(), req, res);
    //return res.status(400).send('Invalid Updates!')
  }
  try {
    updates.forEach((update) => (req.participant[update] = req.body[update]));
    await req.participant.save();
    res.status(200).send(req.participant);
  } catch (e) {
    if (e.code === 11000 || e._message) {
      return errorHandler(new SchemaValidationError(), req, res);
    }
    errorHandler(new BadRequestError(), req, res);
  }
}

module.exports = updateProfile;
