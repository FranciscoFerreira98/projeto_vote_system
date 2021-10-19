const db = require("../models");
const Poll = db.poll;
const pollVote = db.poll_vote;
const pollAnswer = db.poll_answer;
const Op = db.Sequelize.Op;


exports.findAll = (req, res) => {
    const id = req.params.id;
  
    pollAnswer.findAll({ where :{pollId : id}, include: pollVote })
      .then(data => {
        res.send(data);

      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving votes."
        });
      });
  };

  exports.findAndCountAll = (req, res) => {
    const id = req.params.id;
    pollVote.findAndCountAll({ where :{pollId : id}})
      .then(data => {
        res.send({nVotes : data.count});
        
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving votes."
        });
      });
  };