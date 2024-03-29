const db = require("../models");
const Poll = db.poll;
const Question = db.poll_question;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.start_date || !req.body.end_date) {
    res.status(400).send({
      message: "Conteudo não pode estar vazio"
    });
    return;
  }

  // Create a Poll
  const poll = {
    name: req.body.name,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
  };

  // Save Poll in the database
  Poll.create(poll)
    .then(data => {
      res.send(data);

      const ques = {
        question: "Delegado?",
        pollId: data.id
      }
      Question.create(ques)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro a criar a votação."
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Poll.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Poll.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Poll with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Poll.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Poll was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Poll with id=${id}. Maybe Poll was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Poll with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Poll.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Poll was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Poll with id=${id}. Maybe Poll was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Poll with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Poll.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Polls were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};