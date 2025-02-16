'use strict';
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { sequelize } from '../src/utils/db';

class Timezone extends Model<
  InferAttributes<Timezone>,
  InferCreationAttributes<Timezone>
> {
  declare id: CreationOptional<number>;
  declare createdAt: CreationOptional<string>;
  declare updatedAt: CreationOptional<string>;
  declare name: string;
}

Timezone.init(
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
        is: ['^\w+\/\w+$'],
      },
    },
  },
  {
    sequelize,
    modelName: 'Timezone',
  }
);

export default Timezone;
