import { sequelize } from '../config/database.js';
import { defineAssociations } from './relations.js';
import UserModel from '../user.model.js';
import CompanyModel from '../company.model.js';
import PartnerModel from '../partner.model.js';
import ProductModel from '../product.model.js';
import InvoiceModel from '../invoice.model.js';
import OrderItemsModel from '../orderItems.model.js';
import OrderModel from '../order.model.js';
import WarehouseModel from '../warehouse.model.js';

UserModel.initModel(sequelize);
CompanyModel.initModel(sequelize);
ProductModel.initModel(sequelize);
WarehouseModel.initModel(sequelize);
PartnerModel.initModel(sequelize);
OrderModel.initModel(sequelize);
OrderItemsModel.initModel(sequelize);
InvoiceModel.initModel(sequelize);

defineAssociations();

export {
  sequelize,
  UserModel,
  CompanyModel,
  ProductModel,
  WarehouseModel,
  PartnerModel,
  OrderModel,
  OrderItemsModel,
  InvoiceModel,
};
