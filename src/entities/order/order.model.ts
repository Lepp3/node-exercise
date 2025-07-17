import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { type OrderType, OrderTypeEnum } from '../../utility/utilityTypes.js';

export interface OrderProperties {
  id: string;
  warehouseId: string;
  partnerId: string;
  date: Date;
  type: OrderType;
  companyId: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  modifiedBy: string;
}

export class OrderModel extends Model<
  OrderProperties,
  Optional<OrderProperties, 'id'>
> {
  public static initModel(sequelize: Sequelize): typeof OrderModel {
    OrderModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        companyId: {
          type: DataTypes.UUID,
          allowNull: false,
          field: 'companyId',
        },
        partnerId: {
          type: DataTypes.UUID,
          allowNull: true,
          field: 'partnerId',
        },
        type: {
          type: DataTypes.ENUM(OrderTypeEnum.Delivery, OrderTypeEnum.Shipment),
          allowNull: false,
        },
        warehouseId: {
          type: DataTypes.UUID,
          allowNull: false,
          field: 'warehouseId',
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
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
        tableName: 'order',
        freezeTableName: true,
        timestamps: true,
        paranoid: true,
      }
    );
    return OrderModel;
  }
}

export default OrderModel;
