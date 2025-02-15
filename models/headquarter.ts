'use strict';
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../src/utils/db.js';
import Town from './town.js';

interface HeadquarterAttributes {
  bankName: string;
  swiftCode: string;
  address: string;
  townId: string;
}

class Headquarter extends Model<HeadquarterAttributes> implements HeadquarterAttributes {
  declare bankName: string;
  declare swiftCode: string;
  declare address: string;
  declare townId: string;
}

Headquarter.init({
  bankName: DataTypes.STRING,
  swiftCode: DataTypes.STRING,
  address: DataTypes.STRING,
  townId: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'Headquarter',
});

Headquarter.belongsTo(Town, { foreignKey: 'townId', as: 'town' });

export default Headquarter;
