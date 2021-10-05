const mongoose = require("mongoose");
// const errorHandler = require('../middleware/errorHandler')
const {
  DuplicateTeamEntryError,
  TeamFullError,
  BadRequestError,
} = require("../utils/error");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  admin_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  team_code: {
    type: String,
    required: true,
  },
  project_name: {
    type: String,
  },
  project_description: {
    type: String,
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
  hack_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hack",
  },
  members: [
    {
      uid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    },
  ],
});
teamSchema.index({ team_code: 1, hack_id: 1 }, { unique: true });
teamSchema.index(
  { "members.uid": 1, hack_id: 1 },
  { unique: true, partialFilterExpression: { hack_id: { $exists: true } } }
);
teamSchema.index(
  { name: 1, hack_id: 1 },
  { unique: true, partialFilterExpression: { hack_id: { $exists: true } } }
);

const SkillVacancy = require("../models/SkillVacancy");
const Invite = require("../models/Invite");
const Request = require("../models/Request");

teamSchema.post("remove", async function (doc, next) {
  const team = this;
  console.log("entering team post delete hook");
  try {
    const skillVacancies = await SkillVacancy.find({ team_id: team._id });
    await Promise.all(skillVacancies.map((sv) => sv.remove()));

    const invites = await Invite.find({ team_id: team._id });
    await Promise.all(invites.map((invite) => invite.remove()));

    const requests = await Request.find({ team_id: team._id });
    await Promise.all(requests.map((request) => request.remove()));

    next();
    console.log("exiting team post delete hook");
  } catch (e) {
    next(e);
  }
});

teamSchema.pre("save", async function (next) {
  try {
    const team = this;
    let count = 0;
    let check = team.members.filter((member) => {
      if (
        String(member.uid) != String(team.members[team.members.length - 1].uid)
      ) {
        return member.uid;
      } else {
        if (count == 0) {
          count++;
          return member.uid;
        }
      }
    });

    if (check.length < team.members.length) {
      const err = new DuplicateTeamEntryError();
      next(err);
    }
    if (team.hack_id) {
      const Hack = require("./Hack");
      const hack = await Hack.findById(team.hack_id);
      if (team.members.length > hack.max_team_size) {
        const err = new TeamFullError();
        next(err);
      }
    }
    next();
  } catch (e) {
    next(new BadRequestError());
  }
});

const DN_Team = mongoose.model("DN_Team", teamSchema);
module.exports = DN_Team;
