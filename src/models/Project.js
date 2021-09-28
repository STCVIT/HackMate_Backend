const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    validate: {
      validator: function (code) {
        return /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(
          code
        );
      },
      message: `Enter a valid link!`,
    },
  },
  design: {
    type: String,
    validate: {
      validator: function (design) {
        return /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(
          design
        );
      },
      message: `Enter a valid link!`,
    },
  },
  demonstration: {
    type: String,
    validate: {
      validator: function (demonstration) {
        return /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(
          demonstration
        );
      },
      message: `Enter a valid link!`,
    },
  },
  participant_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const projectModel = mongoose.model("Project", projectSchema);

module.exports = projectModel;
