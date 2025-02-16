"use strict";

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../src/utils/db";

interface CountryAttributes {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  iso2: string;
}

class Country extends Model<CountryAttributes> implements CountryAttributes {
  declare id: number;
  declare createdAt: string;
  declare updatedAt: string;
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
      }
    },
  },
  {
    sequelize,
    modelName: "Country",
  }
);

export default Country;
