import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import {
  type SupportType,
  SupportTypeEnum,
} from '../../utility/utilityTypes.js';

export interface WarehouseProperties {
  id: string;
  companyId: string;
  supportType: SupportType;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  modifiedBy: string;
}

export class WarehouseModel extends Model<
  WarehouseProperties,
  Optional<WarehouseProperties, 'id'>
> {
  public static initModel(sequelize: Sequelize): typeof WarehouseModel {
    WarehouseModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        companyId: {
          type: DataTypes.UUID,
          allowNull: false,
          field: 'companyId',
        },
        supportType: {
          type: DataTypes.ENUM(SupportTypeEnum.Liquid, SupportTypeEnum.Solid),
          allowNull: false,
          field: 'supportType',
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          field: 'createdAt',
        },
        updatedAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          field: 'updatedAt',
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
          field: 'deletedAt',
        },
        modifiedBy: {
          type: DataTypes.UUID,
          allowNull: false,
          field: 'modifiedBy',
        },
      },
      {
        sequelize,
        tableName: 'warehouse',
        freezeTableName: true,
        timestamps: true,
        paranoid: true,
      }
    );
    return WarehouseModel;
  }
}

export default WarehouseModel;
