import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import {
  type SupportType,
  SupportTypeEnum,
} from '../../utility/utilityTypes.js';

export interface ProductProperties {
  id: string;
  companyId: string;
  type: SupportType;
  name: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  modifiedBy: string;
}

export class ProductModel extends Model<
  ProductProperties,
  Optional<ProductProperties, 'id'>
> {
  public static initModel(sequelize: Sequelize): typeof ProductModel {
    ProductModel.init(
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
        price: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: 'price',
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
        freezeTableName: true,
        timestamps: true,
        paranoid: true,
      }
    );
    return ProductModel;
  }
}

export default ProductModel;
