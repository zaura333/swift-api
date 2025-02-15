'use strict';
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../src/utils/db.js';
import Town from './town.js';

interface HeadquarterAttributes {
  bankName: string;
  swiftCode: string;
  codeType: string;
  address: string;
  townId: string;
}

class Headquarter extends Model<HeadquarterAttributes> implements HeadquarterAttributes {
  declare bankName: string;
  declare swiftCode: string;
  declare codeType: string;
  declare address: string;
  declare townId: string;
}

Headquarter.init({
  bankName: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  swiftCode: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  codeType: {
    defaultValue: "BIC11",
    type: DataTypes.STRING
  },
  address: DataTypes.STRING,
  townId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: Town,
      key: 'id',
    }
  }
}, {
  sequelize,
  modelName: 'Headquarter',
});

Headquarter.belongsTo(Town, { foreignKey: 'townId', as: 'town' });

export default Headquarter;
