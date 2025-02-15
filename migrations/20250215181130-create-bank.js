/* eslint-disable no-undef */
"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Banks", {
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
      },
      codeType: {
        type: Sequelize.STRING,
        defaultValue: "BIC11",
      },
      bankName: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable("Banks");
  },
};
