const mongoose = require("mongoose");
const DN_Team = require("./Dn-Team");
const Invite = require("./Invite");
const projectModel = require("./Project");
const Request = require("./Request");
const reviewModel = require("./Review");
const Skill = require("./Skill");

const participantSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  github: {
    type: String,
    required: true,
    validate: {
      validator: function (github) {
        let www = /https:\/\/www.github.com\//gm.test(github);
        let onlyHttps = /https:\/\/github.com\//gm.test(github);
        return www || onlyHttps;
      },
      message: `Enter a valid link!`,
    },
  },
  linkedIn: {
    type: String,
    required: true,
    validate: {
      validator: function (linkedIn) {
        return /((https?:\/\/)?((www|\w\w)\.)?linkedin\.com\/)((([\w]{2,3})?)|([^\/]+\/(([\w|\d-&#?=])+\/?){1,}))$/.test(
          linkedIn
        );
      },
      message: `Enter a valid link!`,
    },
  },
  website: {
    type: String,
  },
  photo: {
    type: String,
  },
  college: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  graduation_year: {
    type: Number,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
});

participantSchema.post("remove", async function (doc, next) {
  const participant = this;
  console.log("entering participant post delete hook");
  try {
    const myTeams = await DN_Team.find({
      "members.uid": participant._id,
      admin_id: { $ne: participant._id },
    });
    const myAdminTeams = await DN_Team.find({
      "members.uid": participant._id,
      admin_id: participant._id,
    });
    await Promise.all(myAdminTeams.map((team) => team.remove()));
    await Promise.all(
      myTeams.map(async (team) => {
        let members = team.members.filter((member) => {
          return member.uid != participant._id;
        });
        team.members = members;
        await team.save();
      })
    );
    const skills = await Skill.find({ participant_id: participant._id });
    await Promise.all(skills.map((skill) => skill.remove()));
    const projects = await projectModel.find({
      participant_id: participant._id,
    });
    await Promise.all(projects.map((project) => project.remove()));
    const reviews = await reviewModel.find({ by_id: participant._id });
    await Promise.all(reviews.map((review) => review.remove()));
    const invites = await Invite.find({ participant_id: participant._id });
    await Promise.all(invites.map((invite) => invite.remove()));
    const requests = await Request.find({ participant_id: participant._id });
    await Promise.all(requests.map((request) => request.remove()));
    next();
    console.log("exiting participant post delete hook");
  } catch (e) {
    console.log(e);
    next(e);
  }
});

const participantModel = mongoose.model("Participant", participantSchema);

module.exports = participantModel;
