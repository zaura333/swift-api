"use strict";

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../src/utils/db.js";
import Town from "./town.js";

interface CountryAttributes {
  name: string;
  iso2: string;
}

class Country extends Model<CountryAttributes> implements CountryAttributes {
  declare name: string;
  declare iso2: string;
}

Country.init(
  {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    iso2: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Country",
  }
);

Country.hasMany(Town, { as: "towns" });

export default Country;
