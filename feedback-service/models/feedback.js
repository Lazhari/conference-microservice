const { Model, DataTypes } = require('sequelize');

module.exports = function feedbackBuilder(sequelize) {
  class Feedback extends Model {}
  Feedback.init(
    {
      name: DataTypes.STRING,
      title: DataTypes.STRING,
      message: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { sequelize, modelName: 'feedbacks' },
  );
  return Feedback;
};
