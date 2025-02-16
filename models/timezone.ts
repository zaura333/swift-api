"use strict";
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../src/utils/db";

interface TimezoneAttributes {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
}

class Timezone extends Model<TimezoneAttributes> implements TimezoneAttributes {
  declare id: number;
  declare createdAt: string;
  declare updatedAt: string;
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
        is: ["^\w+\/\w+$"],
      }
    },
  },
  {
    sequelize,
    modelName: "Timezone",
  }
);

export default Timezone;
