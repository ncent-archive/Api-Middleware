module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserAccounts', [{
      apiId: 1,
      "email": "as@ncnt.io",
      "publicKey": "[B@708f5957",
      "apiKey": "[B@3427b02d",
      "privateKey": "[C@619713e5",
      "secretKey": "[C@2c767a52",
      active: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserAccounts', null, {});
  }
};