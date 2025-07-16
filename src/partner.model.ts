import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { type PartnerType, PartnerTypeEnum } from './types/utilityTypes.js';

interface PartnerProperties {
  id: string;
  name: string;
  companyId: string;
  type: PartnerType;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  modifiedBy: string;
}

class PartnerModel
  extends Model<PartnerProperties, Optional<PartnerProperties, 'id'>>
  implements PartnerProperties
{
  public id!: string;
  public companyId!: string;
  public type!: PartnerType;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt?: Date;
  public modifiedBy!: string;

  public static initModel(sequelize: Sequelize): typeof PartnerModel {
    PartnerModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
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
        tableName: 'partner',
        timestamps: true,
        paranoid: true,
      }
    );
    return PartnerModel;
  }
}

export default PartnerModel;
