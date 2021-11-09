const db = require("../models");
const Voter = db.voter;
const {
  Op
} = require("sequelize");
const readXlsxFile = require("read-excel-file/node");
var md5 = require('md5');
const {
  DateTime
} = require("mssql");

const create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Poll
  const voter = {
    name: req.body.name,
    email: req.body.email,
    md5: md5(Math.random()) + md5(Math.random),
    num_student: req.body.num_student,
    pollId: req.body.pollId,
    voted: false
  };
  isMd5Unique(voter.md5).then((meta) => {
    voter.md5 = meta;
    Voter.create(voter)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the voter."
      });
    });
    
  });


  // Save Poll in the database
  /**/
};

function isMd5Unique(md5s) {

  return Voter.count({ where: { md5: md5s } })
    .then(count => {
      if (count != 0) {
        md5s = md5(Math.random()) + md5(Math.random())
        isMd5Unique(md5s);
      }
      return md5s;
    });

}



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

      var voters = [];


      rows.forEach((row) => {
        var voter = {
          name: row[0],
          email: row[1],
          md5: md5(Math.random()) + md5(Math.random()),
          num_student: row[2],
          pollId: req.body.pollId,
          voted: false,
        };

        //voter.md5 = isMd5Unique(voter.md5);
        isMd5Unique(voter.md5).then((meta) => {
          voter.md5 = meta;
          voters.push(voter);
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
      })
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
        message: err.message || "Some error occurred while retrieving voters.",
      });
    });
};


const getVotersById = (req, res) => {
  const id = req.params.id;

  Voter.findAll({
    where: {
      pollId: id
    }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Voters with id=" + id
      });
    });
};

const getVotersByMd5 = (req, res) => {
  const id = req.params.md5;

  console.log(id);
  Voter.findAll({
    where: {
      md5: id
    }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Voters with id=" + id
      });
    });
};

const getVotersByName = (req, res) => {
  const name = req.query.name;
  const pollid = req.query.pollId;
  var condition = name ? {
    pollId: pollid,
    name: {
      [Op.like]: `%${name}%`
    }
  } : {
    pollId: pollid,
  };

  Voter.findAll({
    where: condition
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

const updateVoter = (req, res) => {
  const id = req.params.id;

  Voter.update(req.body, {
    where: {
      id: id
    }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Voter was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Voter with id=${id}. Maybe Voter was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Voter with id=" + id
      });
    });
};

const deleteVoter = (req, res) => {
  const id = req.params.id;
  Voter.destroy({
    where: {
      id: id
    }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Voter was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Voter with id=${id}. Maybe Voter was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Voter with id=" + id
      });
    });
};


module.exports = {
  upload,
  getVoters,
  getVotersById,
  getVotersByName,
  getVotersByMd5,
  deleteVoter,
  updateVoter,
  create
};