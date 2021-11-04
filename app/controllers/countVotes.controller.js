const db = require("../models");
const Poll = db.poll;
const pollVote = db.poll_vote;
const voter = db.voter;
const pollAnswer = db.poll_answer;
const Op = db.Sequelize.Op;


exports.findAll = (req, res) => {
  const id = req.params.id;

  var array = new Array();
  pollAnswer.findAll({ where: { pollId: id }, include: pollVote })
    .then(data => {

      for (let i = 0; i < data.length; i++) {
        var obj = {
          name : data[i].name,
          num_student : data[i].num_student,
          votes : data[i].poll_votes.length
        }
        array.push(obj);
      }

      function compare( a, b ) {
        if ( a.votes > b.votes ){
          return -1;
        }
        if ( a.votes < b.votes ){
          return 1;
        }
        return 0;
      }
      
      array.sort(compare);
      res.send(array);
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
  pollVote.findAndCountAll({ where: { pollId: id } })
    .then(data => {
      res.send({ nVotes: data.count });

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving votes."
      });
    });
};

exports.allVoters = (req, res) => {
  const id = req.params.id;
  voter.findAndCountAll({ where: { pollId: id } })
    .then(data => {
      res.send({ allVoters: data.count });

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving votes."
      });
    });
};

exports.allVotersOfAllTime = (req, res) => {
  voter.findAndCountAll()
    .then(data => {
      res.send({ allVoters: data.count });

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving votes."
      });
    });
};