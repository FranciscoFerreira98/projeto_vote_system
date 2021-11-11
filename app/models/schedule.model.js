module.exports = (sequelize, Sequelize) => {
    const Schedule = sequelize.define("schedule", {
      when: {
        type: Sequelize.DATE
      },
      what: {
        type: Sequelize.STRING
      },
      pending:{
        type: Sequelize.BOOLEAN
      }
    });
    return Schedule;
  };
  