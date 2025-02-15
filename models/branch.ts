'use strict';

import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../src/utils/db.js';
import Town from './town.js';
import Headquarter from './headquarter.js';

interface BranchAttributes {
  swiftCode: string;
  address: string;
  townId: string;
  headquarterId: string;
}

class Branch extends Model<BranchAttributes> implements BranchAttributes {
  declare swiftCode: string;
  declare address: string;
  declare townId: string;
  declare headquarterId: string;
}

Branch.init({
  swiftCode: DataTypes.STRING,
  address: DataTypes.STRING,
  townId: DataTypes.INTEGER,
  headquarterId: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'Branch',
});

Branch.belongsTo(Town, { foreignKey: 'townId', as: 'town' });
Branch.belongsTo(Headquarter, { foreignKey: 'headquarterId', as: 'headquarter' });

export default Branch;
