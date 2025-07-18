/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const existingRecords = await queryInterface.sequelize.query(
      'SELECT COUNT(*) as count FROM invoice',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (existingRecords[0].count > 0) {
      console.log('Invoices data already exists, skipping seed...');
      return;
    }

    await queryInterface.bulkInsert('invoice', [
      {
        id: 'fea14dfb-e421-48f6-958c-b1f19dafc382',
        orderId: 'd05e3582-8a5a-4203-ab9c-7b79973d1657',
        companyId: 'ff5ccb78-ebbd-44fe-9ebf-3d3febdbc83a',
        modifiedBy: '15cadf50-86ef-4bf6-a6cf-80b715fd466f',
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: '1a2430b9-a727-4022-84d5-1b43deebede5',
        orderId: 'f0b34563-0575-41ab-aff9-c77863559a34',
        companyId: 'ff5ccb78-ebbd-44fe-9ebf-3d3febdbc83a',
        modifiedBy: '15cadf50-86ef-4bf6-a6cf-80b715fd466f',
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: '965f5c6d-e480-429b-b61e-7edd6993323c',
        orderId: 'dfb049f3-cd61-41d1-a222-e794e94ec0cb',
        companyId: '656989b2-e3e9-4062-b4fd-1cae09297348',
        modifiedBy: '230f329b-9489-44f9-a11d-9d4e0c631721',
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 'e128adb3-012a-477e-b4f3-7c2ad8680b80',
        orderId: '92762ba2-9cc8-4321-bdc6-053591bacf55',
        companyId: '656989b2-e3e9-4062-b4fd-1cae09297348',
        modifiedBy: '230f329b-9489-44f9-a11d-9d4e0c631721',
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('invoice', null, {});
  },
};
