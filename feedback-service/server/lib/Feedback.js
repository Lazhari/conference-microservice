const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './data/database.sqlite',
});

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
  constructor(dataFile) {
    this.dataFile = dataFile;
  }

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

module.exports = FeedbackService;
