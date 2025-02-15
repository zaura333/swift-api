/* eslint-disable no-undef */
"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Headquarters", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      bankName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      swiftCode: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      codeType: {
        type: Sequelize.STRING,
        defaultValue: "BIC11",
      },
      address: {
        type: Sequelize.STRING,
      },
      townId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Towns",
          key: "id",
        },
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("Headquarters");
  },
};
