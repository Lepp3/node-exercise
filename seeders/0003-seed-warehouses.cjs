/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('warehouse', [
      {
        id: 'dc54527c-47d1-4a94-bd15-1ffbe4659bb3',
        name: 'HF Liquid Depot',
        companyId: 'ff5ccb78-ebbd-44fe-9ebf-3d3febdbc83a',
        supportType: 'liquid',
        modifiedBy: '15cadf50-86ef-4bf6-a6cf-80b715fd466f',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: '53851ccb-f957-4c53-a945-6cc01537f1d7',
        name: 'HF Solid Storage',
        companyId: 'ff5ccb78-ebbd-44fe-9ebf-3d3febdbc83a',
        supportType: 'solid',
        modifiedBy: '15cadf50-86ef-4bf6-a6cf-80b715fd466f',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 'b7218ed2-18a6-4e7e-bc45-21853f4690fa',
        name: 'Goat Liquid Tank',
        companyId: '656989b2-e3e9-4062-b4fd-1cae09297348',
        supportType: 'liquid',
        modifiedBy: 'a38accd9-1120-4520-865b-36e4425d1c39',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: '733f9c7c-a648-4526-9ee5-1e2796bc8c6c',
        name: 'Goat Solid Shed',
        companyId: '656989b2-e3e9-4062-b4fd-1cae09297348',
        supportType: 'solid',
        modifiedBy: 'a38accd9-1120-4520-865b-36e4425d1c39',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('warehouse', null, {});
  },
};
