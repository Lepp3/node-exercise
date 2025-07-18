/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const existingRecords = await queryInterface.sequelize.query(
      'SELECT COUNT(*) as count FROM "orderItems"',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (existingRecords[0].count > 0) {
      console.log('Order items data already exists, skipping seed...');
      return;
    }
    await queryInterface.bulkInsert('orderItems', [
      {
        id: 'ac6b220e-fd93-44ab-a171-6f7ec47a552d',
        orderId: 'd05e3582-8a5a-4203-ab9c-7b79973d1657',
        productId: 'bcd4dd95-ecde-476d-b678-4a04ba596c42',
        quantity: 50,
        modifiedBy: '15cadf50-86ef-4bf6-a6cf-80b715fd466f',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },

      {
        id: 'ed944978-d5d5-4603-b402-d0e43567b361',
        orderId: 'f0b34563-0575-41ab-aff9-c77863559a34',
        productId: 'b8b36077-d254-43d9-b74d-76ef8e32b1e8',
        quantity: 100,
        modifiedBy: '15cadf50-86ef-4bf6-a6cf-80b715fd466f',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 'd40ec4ce-614a-4968-9781-bfe31e2bec10',
        orderId: 'f0b34563-0575-41ab-aff9-c77863559a34',
        productId: 'b74d77c4-13e5-4134-8997-02a4c7518589',
        quantity: 40,
        modifiedBy: '15cadf50-86ef-4bf6-a6cf-80b715fd466f',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },

      {
        id: '7ba96dfd-918e-4faa-b17e-fd59b56d0eb8',
        orderId: '9e068db7-0c09-4f4b-a4a1-764330bd3f30',
        productId: 'b8b36077-d254-43d9-b74d-76ef8e32b1e8',
        quantity: 30,
        modifiedBy: '15cadf50-86ef-4bf6-a6cf-80b715fd466f',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 'e5016d3d-3958-4ba5-a955-62813bc7a446',
        orderId: '9e068db7-0c09-4f4b-a4a1-764330bd3f30',
        productId: 'b74d77c4-13e5-4134-8997-02a4c7518589',
        quantity: 10,
        modifiedBy: '15cadf50-86ef-4bf6-a6cf-80b715fd466f',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },

      {
        id: 'd720d15e-b0af-4082-a5eb-c3d48b653753',
        orderId: 'dfb049f3-cd61-41d1-a222-e794e94ec0cb',
        productId: 'e953ca09-aefb-49ea-ace3-80adbdcfb1dc',
        quantity: 80,
        modifiedBy: '230f329b-9489-44f9-a11d-9d4e0c631721',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: '9e6e2464-8ca2-4039-880a-0709c441f2f1',
        orderId: 'dfb049f3-cd61-41d1-a222-e794e94ec0cb',
        productId: 'ac3749d2-75d7-4830-aecc-46f7abcc0179',
        quantity: 70,
        modifiedBy: '230f329b-9489-44f9-a11d-9d4e0c631721',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },

      {
        id: 'ab0ceffe-4141-4287-9b15-dd09e0949db0',
        orderId: '92762ba2-9cc8-4321-bdc6-053591bacf55',
        productId: '97960f44-4c1f-476b-b919-378fe1eb8a03',
        quantity: 90,
        modifiedBy: '230f329b-9489-44f9-a11d-9d4e0c631721',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },

      {
        id: 'fcae95e8-21e3-440d-a96d-c2a803a7ffe5',
        orderId: '8cdc57b3-0f79-4fa9-8e73-8e88b90b2af7',
        productId: 'e953ca09-aefb-49ea-ace3-80adbdcfb1dc',
        quantity: 20,
        modifiedBy: '230f329b-9489-44f9-a11d-9d4e0c631721',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 'b7e2500c-9b87-48bc-860f-688a9042ab40',
        orderId: '8cdc57b3-0f79-4fa9-8e73-8e88b90b2af7',
        productId: 'ac3749d2-75d7-4830-aecc-46f7abcc0179',
        quantity: 30,
        modifiedBy: '230f329b-9489-44f9-a11d-9d4e0c631721',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('orderItems', null, {});
  },
};
