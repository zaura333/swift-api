import Country from './country';
import Town from './town';
import Timezone from './timezone';
import Bank from './bank';

export function initializeAssociations() {
  // Country <-> Town associations
  Country.hasMany(Town, {
    as: 'towns',
    foreignKey: 'countryId',
  });
  Town.belongsTo(Country, {
    as: 'country',
    foreignKey: 'countryId',
  });

  // Timezone <-> Town associations
  Timezone.hasMany(Town, {
    as: 'towns',
    foreignKey: 'timezoneId',
  });
  Town.belongsTo(Timezone, {
    as: 'timezone',
    foreignKey: 'timezoneId',
  });

  // Town <-> Bank associations
  Town.hasMany(Bank, {
    as: 'banks',
    foreignKey: 'townId',
  });
  Bank.belongsTo(Town, {
    as: 'town',
    foreignKey: 'townId',
  });

  // Bank <-> Country associations
  Bank.belongsTo(Country, {
    as: 'country',
    foreignKey: 'iso2',
  });
  Country.hasMany(Bank, {
    as: 'banks',
    foreignKey: 'iso2',
  });
}
