const { Sequelize } = require('sequelize');
const feedbackBuilder = require('./feedback');

module.exports = function initDb(config) {
  const db = {};
  const sequelize = new Sequelize(config);
  db.Feedback = feedbackBuilder(sequelize);
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
  return db;
};
