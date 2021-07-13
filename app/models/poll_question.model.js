module.exports = (sequelize, Sequelize) => {
    const Poll_Question = sequelize.define("poll_questions", {
      question: {
        type: Sequelize.STRING
      }
    });
    return Poll_Question;
  };
  