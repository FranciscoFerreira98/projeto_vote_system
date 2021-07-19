const db = require("../models");
const Voter = db.voter;

const readXlsxFile = require("read-excel-file/node");
var md5 = require('md5');
const { DateTime } = require("mssql");



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
          name: row[1],
          email: row[2],
          md5: md5(Math.random()),
          num_student: row[3],
        };

        voters.push(voter);
      });

      console.log()
      Voter.bulkCreate(voters)
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

const getVoters = (req, res) => {
  Voter.findAll()
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

module.exports = {
  upload,
  getVoters,
};