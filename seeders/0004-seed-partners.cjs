/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('partner', [
      {
        id: '500a2e86-4ce2-44bb-afb3-600a35c3b5d9',
        name: 'Mega Supplier Inc.',
        companyId: 'ff5ccb78-ebbd-44fe-9ebf-3d3febdbc83a',
        type: 'supplier',
        modifiedBy: '2d18f7bd-276d-4991-9137-184fed4758a1',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: '2b9c6b02-2d47-4e59-93d4-92f43254c889',
        name: 'Green Retail',
        companyId: 'ff5ccb78-ebbd-44fe-9ebf-3d3febdbc83a',
        type: 'customer',
        modifiedBy: '2d18f7bd-276d-4991-9137-184fed4758a1',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: '70c7349d-b53e-48bf-af7b-02f447995e90',
        name: 'Goat Growers LLC',
        companyId: '656989b2-e3e9-4062-b4fd-1cae09297348',
        type: 'supplier',
        modifiedBy: 'a38accd9-1120-4520-865b-36e4425d1c39',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: '5b766df5-0037-4ff9-838b-f68ad392bced',
        name: 'Cheese Mart',
        companyId: '656989b2-e3e9-4062-b4fd-1cae09297348',
        type: 'customer',
        modifiedBy: 'a38accd9-1120-4520-865b-36e4425d1c39',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('partner', null, {});
  },
};
