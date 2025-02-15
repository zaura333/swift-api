'use strict';

import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../src/utils/db.js';
import Country from './country.js';
import Timezone from './timezone.js';
import Headquarter from './headquarter.js';
import Branch from './branch.js';

interface TownAttributes {
  name: string;
  countryId: string;
  timezoneId: string;
}

class Town extends Model<TownAttributes> implements TownAttributes {
  declare name: string;
  declare countryId: string;
  declare timezoneId: string;
}

Town.init({
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  countryId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: Country,
      key: 'id',
    }
  },
  timezoneId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: Timezone,
      key: 'id',
    }
  }
}, {
  sequelize,
  modelName: 'Town',
});

Town.belongsTo(Country, { foreignKey: 'countryId', as: 'country' });
Town.belongsTo(Timezone, { foreignKey: 'timezoneId', as: 'timezone' });
Timezone.hasMany(Headquarter, {as: 'headquarters'});
Timezone.hasMany(Branch, {as: 'branches'});

export default Town;
