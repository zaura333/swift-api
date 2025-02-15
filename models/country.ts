'use strict';

import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../src/utils/db.js';

interface CountryAttributes {
  name: string;
  iso2: string;
}

class Country extends Model<CountryAttributes> implements CountryAttributes {
  declare name: string;
  declare iso2: string;
}

Country.init({
  name: DataTypes.STRING,
  iso2: DataTypes.STRING
}, {
  sequelize,
  modelName: 'Country',
});

export default Country;
