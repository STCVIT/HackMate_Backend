const mongoose = require("mongoose");
const { MinMaxError, DateError } = require("../utils/error");
const DN_Team = require("./Dn-Team");

const mode_of_conduct_options = ["Online", "Offline"];

const hackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
  },
  website: {
    type: String,
    required: true,
    validate: {
      validator: function (website) {
        return /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(
          website
        );
      },
      message: `Enter a valid link!`,
    },
  },
  venue: {
    type: String,
    required: true,
  },
  mode_of_conduct: {
    type: String,
    enum: mode_of_conduct_options,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  max_team_size: {
    type: Number,
    required: true,
  },
  min_team_size: {
    type: Number,
    required: true,
  },
  organiser_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Organiser",
  },
  prize_pool: {
    required: true,
    type: Number,
  },
  description: {
    required: true,
    type: String,
  },
});

hackSchema.post("remove", async function (doc, next) {
  const hack = this;
  console.log(doc);
  try {
    const teams = await DN_Team.find({ hack_id: hack._id });
    await Promise.all(
      teams.map(async (team) => {
        team.hack_id = undefined;
        await team.save();
      })
    );
    next();
  } catch (e) {
    console.log(e);
    next(e);
  }
});

hackSchema.pre("save", async function (next) {
  try {
    if (this.max_team_size < this.min_team_size) {
      next(new MinMaxError());
      return;
    }
    let date = new Date(Date.now());
    if (this.start >= this.end || this.end <= date) {
      next(new DateError());
      return;
    }
    next();
  } catch (e) {
    next(e);
  }
});

const Hack = mongoose.model("Hack", hackSchema);
module.exports = Hack;
