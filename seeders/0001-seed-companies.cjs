/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('company', [
      {
        id: 'ff5ccb78-ebbd-44fe-9ebf-3d3febdbc83a',
        name: 'Happy Farming',
        modifiedBy: '9624fc13-5e84-4605-a9b2-b1fe2b535ee8',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '656989b2-e3e9-4062-b4fd-1cae09297348',
        name: 'We are the GOATS',
        modifiedBy: 'f4ca8fab-ba8c-4dc2-ad7b-1c9ef08d1d57',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('company', null, {});
  },
};
