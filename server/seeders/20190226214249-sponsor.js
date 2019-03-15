module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserAccounts', [{
      apiId: 150,
      "email": "dev+test111@ncnt.io",
      "publicKey": "[B@6356695f",
      "apiKey": "[B@2e005c4b",
      "privateKey": "[C@5ffead27",
      "secretKey": "[C@4567f35d",
      active: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserAccounts', null, {});
  }
};