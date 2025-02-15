'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Branches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      swiftCode: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      codeType: {
        type: Sequelize.STRING,
        defaultValue: "BIC11"
      },
      address: {
        type: Sequelize.STRING
      },
      townId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Towns',
          key: 'id'
        },
        allowNull: false,
      },
      headquarterId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Headquarters',
          key: 'id'
        },
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Branches');
  }
};
