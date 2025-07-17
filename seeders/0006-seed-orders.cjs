/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const existingRecords = await queryInterface.sequelize.query(
      'SELECT COUNT(*) as count FROM order',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (existingRecords[0].count > 0) {
      console.log('Order data already exists, skipping seed...');
      return;
    }

    await queryInterface.bulkInsert('order', [
      {
        id: 'd05e3582-8a5a-4203-ab9c-7b79973d1657',
        companyId: 'ff5ccb78-ebbd-44fe-9ebf-3d3febdbc83a',
        partnerId: '500a2e86-4ce2-44bb-afb3-600a35c3b5d9',
        warehouseId: 'dc54527c-47d1-4a94-bd15-1ffbe4659bb3',
        date: new Date('2025-07-01'),
        type: 'shipment',
        modifiedBy: '15cadf50-86ef-4bf6-a6cf-80b715fd466f',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 'f0b34563-0575-41ab-aff9-c77863559a34',
        companyId: 'ff5ccb78-ebbd-44fe-9ebf-3d3febdbc83a',
        partnerId: '500a2e86-4ce2-44bb-afb3-600a35c3b5d9',
        warehouseId: '53851ccb-f957-4c53-a945-6cc01537f1d7',
        date: new Date('2025-07-02'),
        type: 'shipment',
        modifiedBy: '15cadf50-86ef-4bf6-a6cf-80b715fd466f',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: '9e068db7-0c09-4f4b-a4a1-764330bd3f30',
        companyId: 'ff5ccb78-ebbd-44fe-9ebf-3d3febdbc83a',
        partnerId: '2b9c6b02-2d47-4e59-93d4-92f43254c889',
        warehouseId: '53851ccb-f957-4c53-a945-6cc01537f1d7',
        date: new Date('2025-07-03'),
        type: 'delivery',
        modifiedBy: '15cadf50-86ef-4bf6-a6cf-80b715fd466f',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },

      {
        id: 'dfb049f3-cd61-41d1-a222-e794e94ec0cb',
        companyId: '656989b2-e3e9-4062-b4fd-1cae09297348',
        partnerId: '70c7349d-b53e-48bf-af7b-02f447995e90',
        warehouseId: 'b7218ed2-18a6-4e7e-bc45-21853f4690fa',
        date: new Date('2025-07-04'),
        type: 'shipment',
        modifiedBy: '230f329b-9489-44f9-a11d-9d4e0c631721',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: '92762ba2-9cc8-4321-bdc6-053591bacf55',
        companyId: '656989b2-e3e9-4062-b4fd-1cae09297348',
        partnerId: '70c7349d-b53e-48bf-af7b-02f447995e90',
        warehouseId: '733f9c7c-a648-4526-9ee5-1e2796bc8c6c',
        date: new Date('2025-07-05'),
        type: 'shipment',
        modifiedBy: '230f329b-9489-44f9-a11d-9d4e0c631721',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: '8cdc57b3-0f79-4fa9-8e73-8e88b90b2af7',
        companyId: '656989b2-e3e9-4062-b4fd-1cae09297348',
        partnerId: '5b766df5-0037-4ff9-838b-f68ad392bced',
        warehouseId: '733f9c7c-a648-4526-9ee5-1e2796bc8c6c',
        date: new Date('2025-07-06'),
        type: 'delivery',
        modifiedBy: '230f329b-9489-44f9-a11d-9d4e0c631721',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('order', null, {});
  },
};
