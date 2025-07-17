import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import {
  type PartnerType,
  PartnerTypeEnum,
} from '../../utility/utilityTypes.js';

export interface PartnerProperties {
  id: string;
  name: string;
  companyId: string;
  type: PartnerType;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  modifiedBy: string;
}

class PartnerModel extends Model<
  PartnerProperties,
  Optional<PartnerProperties, 'id'>
> {
  public static initModel(sequelize: Sequelize): typeof PartnerModel {
    PartnerModel.init(
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
        type: {
          type: DataTypes.ENUM(
            PartnerTypeEnum.Customer,
            PartnerTypeEnum.Supplier
          ),
          allowNull: false,
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
        freezeTableName: true,
        tableName: 'partner',
        timestamps: true,
        paranoid: true,
      }
    );
    return PartnerModel;
  }
}

export default PartnerModel;
