import Country from "./country.js";
import Town from "./town.js";
import Timezone from "./timezone.js";
import Bank from "./bank.js";

export function initializeAssociations() {
  // Country <-> Town associations
  Country.hasMany(Town, {
    as: "towns",
    foreignKey: "countryId", // Changed from "id" to "countryId"
  });
  Town.belongsTo(Country, {
    as: "country",
    foreignKey: "countryId",
  });

  // Timezone <-> Town associations
  Timezone.hasMany(Town, {
    as: "towns",
    foreignKey: "timezoneId",
  });
  Town.belongsTo(Timezone, {
    as: "timezone",
    foreignKey: "timezoneId",
  });

  // Town <-> Bank associations
  Town.hasMany(Bank, {
    as: "banks",
    foreignKey: "townId",
  });
  Bank.belongsTo(Town, {
    as: "town",
    foreignKey: "townId",
  });
}
