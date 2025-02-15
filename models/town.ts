'use strict';

import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../src/utils/db.js';

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
  name: DataTypes.STRING,
  countryId: DataTypes.INTEGER,
  timezoneId: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'Town',
});

export default Town;
