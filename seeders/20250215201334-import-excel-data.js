"use strict";

const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    const workbook = XLSX.readFile(
      path.resolve(__dirname, "../data/swift-codes.xlsx")
    );
    const rows = XLSX.utils.sheet_to_json(
      workbook.Sheets[workbook.SheetNames[0]]
    );

    for (const row of rows) {
      const transaction = await queryInterface.sequelize.transaction();

      const iso2 = row["COUNTRY ISO2 CODE"].trim();
      const timezone = row["TIME ZONE"].trim();
      const townName = row["TOWN NAME"].trim();
      const swiftCode = row["SWIFT CODE"].trim();
      const bankName = row["NAME"].trim();
      const address = row.ADDRESS.trim();
      const codeType = (row["CODE TYPE"] || "BIC11").trim();

      try {
        // 1. Process time zone
        const timezoneResult = await queryInterface.sequelize.query(
          `
          WITH inserted_timezone AS (
            INSERT INTO "Timezones" (name)
            VALUES (:timezone)
            ON CONFLICT (name) DO NOTHING
            RETURNING id
          )
          SELECT id FROM inserted_timezone
          UNION
          SELECT id FROM "Timezones" WHERE name = :timezone
        `,
          {
            replacements: { timezone },
            transaction,
            type: queryInterface.sequelize.QueryTypes.SELECT,
          }
        );

        if (!timezoneResult || timezoneResult.length === 0) {
          throw new Error(
            `Failed to get/create timezone for ${row["TIME ZONE"]}`
          );
        }
        const timezoneId = timezoneResult[0].id;

        // 2. Get country
        const countryResult = await queryInterface.sequelize.query(
          `
          SELECT id FROM "Countries"
          WHERE iso2 = :iso2
          LIMIT 1
        `,
          {
            replacements: { iso2 },
            transaction,
            type: queryInterface.sequelize.QueryTypes.SELECT,
          }
        );

        if (!countryResult || countryResult.length === 0) {
          throw new Error(
            `Country with ISO2 ${row["COUNTRY ISO2 CODE"]} not found`
          );
        }
        const countryId = countryResult[0].id;

        // 3. Process town
        const townResult = await queryInterface.sequelize.query(
          `
          WITH inserted_town AS (
            INSERT INTO "Towns" (name, "countryId", "timezoneId")
            VALUES (:townName, :countryId, :timezoneId)
            ON CONFLICT (name, "countryId") DO UPDATE
            SET "timezoneId" = EXCLUDED."timezoneId"
            RETURNING id
          )
          SELECT id FROM inserted_town
        `,
          {
            replacements: {
              townName,
              countryId,
              timezoneId,
            },
            transaction,
            type: queryInterface.sequelize.QueryTypes.SELECT,
          }
        );

        if (!townResult || townResult.length === 0) {
          throw new Error(`Failed to create town ${row["TOWN NAME"]}`);
        }
        const townId = townResult[0].id;

        // 4. Process SWIFT Code
        const swiftCode = row["SWIFT CODE"];
        await queryInterface.sequelize.query(
          `
            INSERT INTO "Banks" 
              ("swiftCode", "bankName", address, iso2, "townId", "codeType")
            VALUES (:swiftCode, :bankName, :address, :iso2, :townId, :codeType)
            ON CONFLICT ("swiftCode") DO UPDATE SET
              "bankName" = EXCLUDED."bankName",
              address = EXCLUDED.address,
              "iso2" = EXCLUDED."iso2",
              "townId" = EXCLUDED."townId",
              "codeType" = EXCLUDED."codeType"
          `,
          {
            replacements: {
              swiftCode,
              bankName,
              address: address || null,
              iso2,
              townId,
              codeType,
            },
            transaction,
          }
        );

        await transaction.commit();
      } catch (error) {
        await transaction.rollback();
        console.error(`Error processing row: ${JSON.stringify(row)}`);
        console.error(error.message);
      }
    }
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      TRUNCATE TABLE 
        "Branches", 
        "Headquarters", 
        "Towns", 
        "Timezones"
      RESTART IDENTITY CASCADE
    `);
  },
};
