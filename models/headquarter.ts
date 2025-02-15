"use strict";
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../src/utils/db.js";
import Town from "./town.js";

interface HeadquarterAttributes {
  id: number;
  createdAt: string;
  updatedAt: string;
  bankName: string;
  swiftCode: string;
  codeType: string;
  address: string;
  townId: string;
}

class Headquarter
  extends Model<HeadquarterAttributes>
  implements HeadquarterAttributes
{
  declare id: number;
  declare createdAt: string;
  declare updatedAt: string;
  declare bankName: string;
  declare swiftCode: string;
  declare codeType: string;
  declare address: string;
  declare townId: string;
}

Headquarter.init(
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
    bankName: {
      allowNull: false,
      type: DataTypes.STRING,
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
    address: DataTypes.STRING,
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
    modelName: "Headquarter",
  }
);

Headquarter.belongsTo(Town, { foreignKey: "townId", as: "town" });

export default Headquarter;
