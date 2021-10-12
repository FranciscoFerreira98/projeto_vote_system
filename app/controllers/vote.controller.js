const db = require("../models");
const pollVote = db.poll_vote;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    // Validate request
    if (!req.body.pollId) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Poll
    const vote = {
      pollId: req.body.pollId,
      pollQuestionId: req.body.pollQuestionId,
      pollAnswerId: req.body.pollAnswerId,
    };
    // Save Poll in the database
    pollVote.create(vote)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the vote."
        });
      });
  };