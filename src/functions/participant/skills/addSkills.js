const Skill = require("../../../models/Skill");

const addSkills = async (req, res) => {
  try {
    const skills = req.body.skills;
    if (skills.length == 0) {
      return res.status(404).send("Please enter some skills");
    }
    const allowed_skills = [
      "frontend",
      "backend",
      "ml",
      "ui/ux",
      "appdev",
      "management",
      "blockchain",
      "cybersecurity",
    ];
    const isAllowed = skills.every((skill) => allowed_skills.includes(skill));
    console.log(isAllowed);
    if (!isAllowed) {
      return res.status(403).send("Invalid skills");
    }
    await Skill.deleteMany({ participant_id: req.participant._id });
    let skillRecords = [];
    let i = 0;
    skills.forEach(async (skill) => {
      const newSkill = new Skill({
        skill,
        participant_id: req.participant._id,
      });
      await newSkill.save();
      skillRecords.push(newSkill);
      i++;
      if (i == skills.length) {
        //console.log('hi',skillRecords)
        res.status(201).send(skillRecords);
      }
    });
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = addSkills;

//await promise map inplace of for each
