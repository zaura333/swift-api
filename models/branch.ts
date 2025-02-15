'use strict';

import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../src/utils/db.js';
import Town from './town.js';
import Headquarter from './headquarter.js';

interface BranchAttributes {
  swiftCode: string;
  codeType: string;
  address: string;
  townId: string;
  headquarterId: string;
}

class Branch extends Model<BranchAttributes> implements BranchAttributes {
  declare swiftCode: string;
  declare codeType: string;
  declare address: string;
  declare townId: string;
  declare headquarterId: string;
}

Branch.init({
  swiftCode: {
    allowNull: false,
    type: DataTypes.STRING,
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
      key: 'id',
    }
  },
  headquarterId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: Headquarter,
      key: 'id',
    }
  }
}, {
  sequelize,
  modelName: 'Branch',
});

Branch.belongsTo(Town, { foreignKey: 'townId', as: 'town' });
Branch.belongsTo(Headquarter, { foreignKey: 'headquarterId', as: 'headquarter' });

export default Branch;
