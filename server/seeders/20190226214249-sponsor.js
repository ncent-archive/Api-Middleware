module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserAccounts', [{
      apiId: 180,
      "email": "dev+test113@ncnt.io",
      "publicKey": "[B@3e58a80e",
      "apiKey": "[B@4466af20",
      "privateKey": "[C@6b927fb",
      "secretKey": "[C@a514af7",
      active: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserAccounts', null, {});
  }
};