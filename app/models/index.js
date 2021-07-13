const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.voter = require("../models/voter.model.js")(sequelize, Sequelize);
db.poll = require("../models/poll.model.js")(sequelize, Sequelize);
db.poll_answer = require("../models/poll_answer.model.js")(sequelize, Sequelize);
db.poll_question = require("../models/poll_question.model.js")(sequelize, Sequelize);
db.poll_vote = require("../models/poll_vote.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.poll.belongsToMany(db.user, {
  through: "poll_users",
  foreignKey: "pollId",
  otherKey: "userId"
});

db.user.belongsToMany(db.poll, {
  through: "poll_users",
  foreignKey: "userId",
  otherKey: "pollId"
});

db.poll.hasMany(db.voter);
db.voter.belongsTo(db.poll, {
  foreignKey: "pollId",
  as: "poll",
});

db.poll.hasMany(db.poll_answer);
db.poll_answer.belongsTo(db.poll, {
  foreignKey: "pollId",
  as: "poll",
});

db.poll.hasMany(db.poll_question);
db.poll_question.belongsTo(db.poll, {
  foreignKey: "pollId",
  as: "poll",
});

db.poll.hasMany(db.poll_vote);
db.poll_vote.belongsTo(db.poll, {
  foreignKey: "pollId",
  as: "poll",
});



db.poll_question.hasMany(db.poll_answer);
db.poll_answer.belongsTo(db.poll_question, {
  foreignKey: "poll_questioId",
  as: "poll_question",
});

/*

db.poll_question.hasMany(db.poll_vote);
db.poll_vote.belongsTo(db.poll, {
  foreignKey: "poll_questioId",
  as: "poll_question",
});

db.poll_answer.hasMany(db.poll_vote);
db.poll_vote.belongsTo(db.poll, {
  foreignKey: "poll_answerId",
  as: "poll_answer",
});
*/

db.ROLES = ["user", "admin", "mesa"];

module.exports = db;
