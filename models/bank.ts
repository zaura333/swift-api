"use strict";

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../src/utils/db.js";
import Town from "./town.js";
import Country from "./country.js";

interface BankAttributes {
  id: number;
  createdAt: string;
  updatedAt: string;
  swiftCode: string;
  codeType: string;
  bankName: string;
  address: string;
  iso2: string;
  townId: number;
}

class Bank extends Model<BankAttributes> implements BankAttributes {
  declare id: number;
  declare createdAt: string;
  declare updatedAt: string;
  declare swiftCode: string;
  declare codeType: string;
  declare bankName: string;
  declare address: string;
  declare iso2: string;
  declare townId: number;
}

Bank.init(
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
    swiftCode: {
      allowNull: false,
      type: DataTypes.STRING(11),
      unique: true,
    },
    codeType: {
      defaultValue: "BIC11",
      type: DataTypes.STRING,
    },
    bankName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    address: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    iso2: {
      allowNull: false,
      type: DataTypes.STRING(2),
      references: {
        model: Country,
        key: "iso2",
      },
    },
    townId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: Town,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Bank",
  }
);

export default Bank;
