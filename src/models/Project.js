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
      validator: function (github) {
        let www = /https:\/\/www.github.com\//gm.test(github);
        let onlyHttps = /https:\/\/github.com\//gm.test(github);
        let nullV = github === "";
        return www || onlyHttps || nullV;
      },
      message: `Enter a valid link!`,
    },
  },
  design: {
    type: String,
  },
  demonstration: {
    type: String,
  },
  participant_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const projectModel = mongoose.model("Project", projectSchema);

module.exports = projectModel;
