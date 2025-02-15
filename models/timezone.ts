'use strict';
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../src/utils/db.js';
import Town from './town.js';

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
    unique: true,
  },
}, {
  sequelize,
  modelName: 'Timezone',
});

Timezone.hasMany(Town, {as: 'towns'})

export default Timezone;
