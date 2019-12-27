const { Model, DataTypes } = require('sequelize');

module.exports = function speakerBuilder(sequelize) {
  class Speaker extends Model {}
  Speaker.init(
    {
      title: DataTypes.STRING,
      name: DataTypes.STRING,
      shortName: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'speakers',
    },
  );
  return Speaker;
};
