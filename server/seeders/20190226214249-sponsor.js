module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserAccounts', [{
      apiId: 1,
      apiKey: "[B@3427b02d",
      secretKey: "[C@2c767a52",
      publicKey: "[B@708f5957",
      privateKey: "[C@619713e5",
      email: "as@ncnt.io",
      active: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserAccounts', null, {});
  }
};