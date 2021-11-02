const db = require("../models");
const Representative = db.poll_answer;
const { Op } = require("sequelize");
const readXlsxFile = require("read-excel-file/node");
var md5 = require('md5');
const { DateTime } = require("mssql");



const create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Poll
  const represent = {
    name: req.body.name,
    pollId: req.body.pollId,
    num_student: req.body.num_student,
    pollQuestionId: req.body.pollQuestionId
  };

  // Save Poll in the database
  Representative.create(represent)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the represent."
      });
    });
};

const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }

    let path =
      __basedir + "/resources/static/assets/uploads/" + req.file.filename;

    readXlsxFile(path).then((rows) => {
      // skip header
      rows.shift();

      let voters = [];

      rows.forEach((row) => {
        let voter = { 
          name: row[0],
          email: row[1],
          md5: md5(Math.random()),
          num_student: row[2],
          pollId: req.body.pollId,
        };
        console.log(voter.name)
        voters.push(voter);
      });

      
      Representative.bulkCreate(voters)
        .then(() => {
          res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: "Fail to import data into database!",
            error: error.message,
          });
        });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

const getRepresentatives = (req, res) => {
  Representative.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving voters.",
      });
    });
};


const getRepresentativeById = (req, res) => {
  const id = req.params.id;

  Representative.findAll({
      where: {
        pollId: id
      }
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Representatives with id=" + id
      });
    });
};

const getRepresentativeByName = (req, res) => {
  const name = req.query.name;
  const pollid = req.query.pollId;
  var condition = name ? 
  {
    pollId: pollid, 
    name: { [Op.like]: `%${name}%` }
  } : 
  {
    pollId: pollid, 
  };

  Representative.findAll({ where: condition })
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

const deleteRepresentative = (req, res) => {
  const id = req.params.id;
  Representative.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Representative was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Representative with id=${id}. Maybe Representative was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Representative with id=" + id
      });
    });
};


module.exports = {
  upload,
  getRepresentatives,
  getRepresentativeById,
  getRepresentativeByName,
  deleteRepresentative,
  create
};