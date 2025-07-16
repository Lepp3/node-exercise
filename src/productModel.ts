import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { type SupportType, SupportTypeEnum } from './types/utilityTypes.js';

interface ProductProperties {
  id: string;
  companyId: string;
  type: SupportType;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  modifiedBy: string;
}

class ProductModel
  extends Model<ProductProperties, Optional<ProductProperties, 'id'>>
  implements ProductProperties
{
  public id!: string;
  public companyId!: string;
  public name!: string;
  public type!: SupportType;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
  public modifiedBy!: string;

  public static initModel(sequelize: Sequelize): typeof ProductModel {
    ProductModel.init(
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
          type: DataTypes.ENUM(SupportTypeEnum.Liquid, SupportTypeEnum.Solid),
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
        tableName: 'product',
        timestamps: true,
        paranoid: true,
      }
    );
    return ProductModel;
  }
}

export default ProductModel;
