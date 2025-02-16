/* eslint-disable no-undef */
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Banks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      swiftCode: {
        type: Sequelize.STRING(11),
        unique: true,
        allowNull: false,
        validate: {
          isUppercase: true,
          is: ['^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3}|XXX)$'],
        },
      },
      codeType: {
        type: Sequelize.STRING,
        defaultValue: 'BIC11',
      },
      bankName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isUppercase: true,
        },
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          is: ['^(?:[^;]+;[^;]+(?:;[^;]+;[^;]+)?)$'],
        },
      },
      iso2: {
        type: Sequelize.STRING(2),
        references: {
          model: 'Countries',
          key: 'iso2',
        },
        allowNull: false,
        validate: {
          isUppercase: true,
        },
      },
      townId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Towns',
          key: 'id',
        },
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Banks');
  },
};
