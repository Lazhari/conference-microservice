const { Sequelize } = require('sequelize');
const speakerBuilder = require('./speaker');

module.exports = function initDb(config) {
  const sequelize = new Sequelize(config);
  const Speaker = speakerBuilder(sequelize);
  return {
    Speaker,
    sequelize,
    Sequelize,
  };
};
