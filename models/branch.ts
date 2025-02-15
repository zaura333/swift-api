"use strict";

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../src/utils/db.js";
import Town from "./town.js";
import Headquarter from "./headquarter.js";

interface BranchAttributes {
  id: number;
  createdAt: string;
  updatedAt: string;
  swiftCode: string;
  codeType: string;
  address: string;
  townId: string;
  headquarterId: string;
}

class Branch extends Model<BranchAttributes> implements BranchAttributes {
  declare id: number;
  declare createdAt: string;
  declare updatedAt: string;
  declare swiftCode: string;
  declare codeType: string;
  declare address: string;
  declare townId: string;
  declare headquarterId: string;
}

Branch.init(
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
    address: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    townId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: Town,
        key: "id",
      },
    },
    headquarterId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: Headquarter,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Branch",
  }
);

Branch.belongsTo(Town, { foreignKey: "townId", as: "town" });
Branch.belongsTo(Headquarter, {
  foreignKey: "headquarterId",
  as: "headquarter",
});

export default Branch;
