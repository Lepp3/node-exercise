import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface CompanyProperties {
  id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  modifiedBy: string;
}

class CompanyModel extends Model<
  CompanyProperties,
  Optional<CompanyProperties, 'id'>
> {
  public static initModel(sequelize: Sequelize): typeof CompanyModel {
    CompanyModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
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
          allowNull: true,
          field: 'modifiedBy',
        },
      },
      {
        sequelize,
        tableName: 'company',
        freezeTableName: true,
        timestamps: true,
        paranoid: true,
      }
    );
    return CompanyModel;
  }
}

export default CompanyModel;
