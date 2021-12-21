const db = require("../models");
const Poll = db.poll;
const Schedule = db.schedule;
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
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocorreu um erro a criar a votação."
        });
      });
  };




