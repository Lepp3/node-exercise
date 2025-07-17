/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const existingRecords = await queryInterface.sequelize.query(
      'SELECT COUNT(*) as count FROM user',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (existingRecords[0].count > 0) {
      console.log('User data already exists, skipping seed...');
      return;
    }

    await queryInterface.bulkInsert('user', [
      {
        id: '15cadf50-86ef-4bf6-a6cf-80b715fd466f',
        name: 'Alice Farm',
        username: 'alicehf',
        password: 'securepass1',
        email: 'alice@happyfarming.com',
        companyId: 'ff5ccb78-ebbd-44fe-9ebf-3d3febdbc83a',
        modifiedBy: '15cadf50-86ef-4bf6-a6cf-80b715fd466f',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: '2d18f7bd-276d-4991-9137-184fed4758a1',
        name: 'Bob Farm',
        username: 'bobhf',
        password: 'securepass2',
        email: 'bob@happyfarming.com',
        companyId: 'ff5ccb78-ebbd-44fe-9ebf-3d3febdbc83a',
        modifiedBy: '2d18f7bd-276d-4991-9137-184fed4758a1',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: '230f329b-9489-44f9-a11d-9d4e0c631721',
        name: 'Carol Goat',
        username: 'carolgoat',
        password: 'securepass3',
        email: 'carol@goats.com',
        companyId: '656989b2-e3e9-4062-b4fd-1cae09297348',
        modifiedBy: '230f329b-9489-44f9-a11d-9d4e0c631721',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 'a38accd9-1120-4520-865b-36e4425d1c39',
        name: 'Dave Goat',
        username: 'davegoat',
        password: 'securepass4',
        email: 'dave@goats.com',
        companyId: '656989b2-e3e9-4062-b4fd-1cae09297348',
        modifiedBy: 'a38accd9-1120-4520-865b-36e4425d1c39',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', null, {});
  },
};
