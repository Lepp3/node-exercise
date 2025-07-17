/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const existingRecords = await queryInterface.sequelize.query(
      'SELECT COUNT(*) as count FROM product',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (existingRecords[0].count > 0) {
      console.log('Product data already exists, skipping seed...');
      return;
    }
    await queryInterface.bulkInsert('product', [
      {
        id: 'b8b36077-d254-43d9-b74d-76ef8e32b1e8',
        name: 'Hay Bale',
        companyId: 'ff5ccb78-ebbd-44fe-9ebf-3d3febdbc83a',
        type: 'solid',
        price: 15.99,
        modifiedBy: '15cadf50-86ef-4bf6-a6cf-80b715fd466f',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 'b74d77c4-13e5-4134-8997-02a4c7518589',
        name: 'Tractor Grease',
        companyId: 'ff5ccb78-ebbd-44fe-9ebf-3d3febdbc83a',
        type: 'solid',
        price: 9.49,
        modifiedBy: '2d18f7bd-276d-4991-9137-184fed4758a1',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 'bcd4dd95-ecde-476d-b678-4a04ba596c42',
        name: 'Liquid Fertilizer HF',
        companyId: 'ff5ccb78-ebbd-44fe-9ebf-3d3febdbc83a',
        type: 'liquid',
        price: 22.0,
        modifiedBy: '15cadf50-86ef-4bf6-a6cf-80b715fd466f',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },

      {
        id: 'e953ca09-aefb-49ea-ace3-80adbdcfb1dc',
        name: 'Goat Milk',
        companyId: '656989b2-e3e9-4062-b4fd-1cae09297348',
        type: 'liquid',
        price: 3.5,
        modifiedBy: '230f329b-9489-44f9-a11d-9d4e0c631721',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 'ac3749d2-75d7-4830-aecc-46f7abcc0179',
        name: 'Cheese Whey',
        companyId: '656989b2-e3e9-4062-b4fd-1cae09297348',
        type: 'liquid',
        price: 1.8,
        modifiedBy: 'a38accd9-1120-4520-865b-36e4425d1c39',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: '97960f44-4c1f-476b-b919-378fe1eb8a03',
        name: 'Goat Feed',
        companyId: '656989b2-e3e9-4062-b4fd-1cae09297348',
        type: 'solid',
        price: 12.75,
        modifiedBy: 'a38accd9-1120-4520-865b-36e4425d1c39',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product', null, {});
  },
};
