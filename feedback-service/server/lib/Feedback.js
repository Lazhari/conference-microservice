const { Sequelize, Model, DataTypes } = require('sequelize');

module.exports = function feedbackBuilder({ dbConfig }) {
  const sequelize = new Sequelize(dbConfig);

  class Feedback extends Model {}

  Feedback.init(
    {
      name: DataTypes.STRING,
      title: DataTypes.STRING,
      message: DataTypes.STRING,
      createdAt: DataTypes.DATE,
    },
    { sequelize, modelName: 'feedbacks' },
  );

  class FeedbackService {
    // eslint-disable-next-line class-methods-use-this
    async addEntry(name, title, message) {
      return Feedback.create({ name, title, message });
    }

    // eslint-disable-next-line class-methods-use-this
    async getList() {
      const data = await Feedback.findAll();
      return data;
    }
  }
  return new FeedbackService();
};
