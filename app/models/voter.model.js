module.exports = (sequelize, Sequelize) => {
  const Voter = sequelize.define("voters", {
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    md5: {
      type: Sequelize.STRING
    },
    num_student: {
      type: Sequelize.STRING
    },
    voted: {
      type: Sequelize.BOOLEAN
    }
  });
  return Voter;
};