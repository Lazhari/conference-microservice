'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'feedbacks',
      [
        {
          name: 'John Doe',
          title: 'Awesome App',
          message: 'This amazing',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'John Doe',
          title: 'Sequelize',
          message: 'This amazing',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('feedbacks', null, {});
  },
};
