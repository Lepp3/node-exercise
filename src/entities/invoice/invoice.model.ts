import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface InvoiceProperties {
  id: string;
  companyId: string;
  orderId: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  modifiedBy: string;
}

export class InvoiceModel extends Model<
  InvoiceProperties,
  Optional<InvoiceProperties, 'id'>
> {
  public static initModel(sequelize: Sequelize): typeof InvoiceModel {
    InvoiceModel.init(
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
        tableName: 'invoice',
        timestamps: true,
        paranoid: true,
      }
    );
    return InvoiceModel;
  }
}

export default InvoiceModel;
