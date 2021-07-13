module.exports = (sequelize, Sequelize) => {
    const Poll_Answer = sequelize.define("poll_answers", {
      name: {
        type: Sequelize.STRING
      },
      num_student: {
        type: Sequelize.STRING
      },
    });
    return Poll_Answer;
  };
  