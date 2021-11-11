const db = require("../models");
const Voter = db.voter;
const { Op } = require("sequelize");
const readXlsxFile = require("read-excel-file/node");
var md5 = require("md5");
const { DateTime } = require("mssql");
const { voter } = require("../models");

const create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Poll
  const voter = {
    name: req.body.name,
    email: req.body.email,
    md5: md5(Math.random()) + md5(Math.random()),
    num_student: req.body.num_student,
    pollId: req.body.pollId,
    voted: false,
  };

  Voter.create(voter)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the voter.",
      });

    });
};


function isMd5Unieque(md5s) {
  console.log("entrei");
  do {
    Voter.findOne({ where: { md5: md5s } })
      .then(count => {
        if (count != null) {
          md5s = md5(Math.random()) + md5(Math.random()),
            isMd5Unieque(md5s)
            sequelize.close();
        }
        return md5s;
      }).catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving voters.",
        });
      });
  } while (true);
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
      for (let row of rows) {
        let voter = {
          name: row[0],
          email: row[1],
          md5: "2ab8174b4ed1a869bfbe48f48d7dfad280c9a66495556a2e18e27f4802b66db4",
          num_student: row[2],
          pollId: req.body.pollId,
          voted: false,
        };
        console.log("\x1b[31mOld Md5: %s\x1b[0m", voter.md5);
        var top;
        /*var newmd5 = Promise.resolve(isMd5Unieque(voter.md5));
        console.log(newmd5);
        (async () => top = await isMd5Unieque(voter.md5))
        console.log(top);*/
        isMd5Unieque(voter.md5).then(isUnique => {
          voter.md5 = isUnique;
          console.log("Função: " + voter.md5);
        });

        voters.push(voter);
        console.log("New Md5: %s", voter.md5);
      }

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
        message: err.message || "Some error occurred while retrieving voters.",
      });
    });
};

const getVotersById = (req, res) => {
  const id = req.params.id;

  Voter.findAll({
    where: {
      pollId: id,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Voters with id=" + id,
      });
    });
};

const getVotersByMd5 = (req, res) => {
  const id = req.params.md5;

  console.log(id);
  Voter.findAll({
    where: {
      md5: id,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Voters with id=" + id,
      });
    });
};

const getVotersByName = (req, res) => {
  const name = req.query.name;
  const pollid = req.query.pollId;
  var condition = name
    ? {
      pollId: pollid,
      name: {
        [Op.like]: `%${name}%`,
      },
    }
    : {
      pollId: pollid,
    };

  Voter.findAll({
    where: condition,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

const updateVoter = (req, res) => {
  const id = req.params.id;

  Voter.update(req.body, {
    where: {
      id: id,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Voter was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Voter with id=${id}. Maybe Voter was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Voter with id=" + id,
      });
    });
};

const deleteVoter = (req, res) => {
  const id = req.params.id;
  Voter.destroy({
    where: {
      id: id,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Voter was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Voter with id=${id}. Maybe Voter was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Voter with id=" + id,
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
  create,
};
