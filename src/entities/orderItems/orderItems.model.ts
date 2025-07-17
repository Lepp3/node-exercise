import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface OrderItemsProperties {
  id: string;
  productId: string;
  orderId: string;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  modifiedBy: string;
}

class OrderItemsModel extends Model<
  OrderItemsProperties,
  Optional<OrderItemsProperties, 'id'>
> {
  public static initModel(sequelize: Sequelize): typeof OrderItemsModel {
    OrderItemsModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        productId: {
          type: DataTypes.UUID,
          allowNull: false,
          field: 'productId',
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        orderId: {
          type: DataTypes.UUID,
          allowNull: false,
          field: 'orderId',
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
        tableName: 'orderItems',
        timestamps: true,
        paranoid: true,
      }
    );
    return OrderItemsModel;
  }
}

export default OrderItemsModel;
