module.exports = (sequelize, Sequelize) => {
    const Poll = sequelize.define("polls", {
      name: {
        type: Sequelize.STRING
      },
      start_date: {
        type: Sequelize.DATE
      },
      end_date: {
        type: Sequelize.DATE
      }
    });
    return Poll;
  };
  