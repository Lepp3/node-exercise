import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface UserProperties {
  id: string;
  name: string;
  username: string;
  password: string;
  email: string;
  companyId: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  modifiedBy: string;
}

class UserModel extends Model<UserProperties, Optional<UserProperties, 'id'>> {
  public static initModel(sequelize: Sequelize): typeof UserModel {
    UserModel.init(
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
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        companyId: {
          type: DataTypes.UUID,
          allowNull: false,
          field: 'companyId',
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
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
        tableName: 'user',
        freezeTableName: true,
        timestamps: true,
        paranoid: true,
      }
    );
    return UserModel;
  }
}

export default UserModel;
