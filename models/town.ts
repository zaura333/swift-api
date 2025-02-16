'use strict';

import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { sequelize } from '../src/utils/db';
import Country from './country';
import Timezone from './timezone';

class Town extends Model<InferAttributes<Town>, InferCreationAttributes<Town>> {
  declare id: CreationOptional<number>;
  declare createdAt: CreationOptional<string>;
  declare updatedAt: CreationOptional<string>;
  declare name: string;
  declare countryId: number;
  declare timezoneId: CreationOptional<number>;
}

Town.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW(),
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW(),
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: 'unique_town_country',
      validate: {
        isUppercase: true,
      },
    },
    countryId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: Country,
        key: 'id',
      },
      unique: 'unique_town_country',
    },
    timezoneId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: Timezone,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Town',
  }
);

export default Town;
