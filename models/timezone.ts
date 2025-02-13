'use strict';
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../src/utils/db.js';

interface TimezoneAttributes {
  name: string;
}

class Timezone extends Model<TimezoneAttributes> implements TimezoneAttributes {
  declare name: string;
}

Timezone.init({
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'Timezone',
});

export default Timezone;
