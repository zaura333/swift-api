'use strict';

import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { sequelize } from '../src/utils/db';

class Country extends Model<
  InferAttributes<Country>,
  InferCreationAttributes<Country>
> {
  declare id: CreationOptional<number>;
  declare createdAt: CreationOptional<string>;
  declare updatedAt: CreationOptional<string>;
  declare name: string;
  declare iso2: string;
}

Country.init(
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
      unique: true,
      validate: {
        isUppercase: true,
      },
    },
    iso2: {
      allowNull: false,
      type: DataTypes.STRING(2),
      unique: true,
      validate: {
        isUppercase: true,
      },
    },
  },
  {
    sequelize,
    modelName: 'Country',
  }
);

export default Country;
