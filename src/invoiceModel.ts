import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface InvoiceProperties {
  id: string;
  date: Date;
  orderId: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  modifiedBy: string;
}

class InvoiceModel
  extends Model<InvoiceProperties, Optional<InvoiceProperties, 'id'>>
  implements InvoiceProperties
{
  public id!: string;
  public date!: Date;
  public orderId!: string;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
  public modifiedBy!: string;

  public static initModel(sequelize: Sequelize): typeof InvoiceModel {
    InvoiceModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
        },
        orderId: {
          type: DataTypes.UUID,
          allowNull: false,
          field: 'orderId',
        },
        date: {
          type: DataTypes.DATE,
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
        tableName: 'invoice',
        timestamps: true,
        paranoid: true,
      }
    );
    return InvoiceModel;
  }
}

export default InvoiceModel;
