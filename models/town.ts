"use strict";

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../src/utils/db.js";
import Country from "./country.js";
import Timezone from "./timezone.js";
import Bank from "./bank.js";

interface TownAttributes {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  countryId: string;
  timezoneId: string;
}

class Town extends Model<TownAttributes> implements TownAttributes {
  declare id: number;
  declare createdAt: string;
  declare updatedAt: string;
  declare name: string;
  declare countryId: string;
  declare timezoneId: string;
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
      unique: "unique_town_country",
    },
    countryId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: Country,
        key: "id",
      },
      unique: "unique_town_country",
    },
    timezoneId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: Timezone,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Town",
  }
);

export default Town;
