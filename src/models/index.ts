import { sequelize } from '../config/database.js';
import { defineAssociations } from './relations.js';
import UserModel from '../entities/user/user.model.js';
import CompanyModel from '../entities/company/company.model.js';
import PartnerModel from '../entities/partner/partner.model.js';
import ProductModel from '../entities/product/product.model.js';
import InvoiceModel from '../entities/invoice/invoice.model.js';
import OrderItemsModel from '../entities/orderItems/orderItems.model.js';
import OrderModel from '../entities/order/order.model.js';
import WarehouseModel from '../entities/warehouse/warehouse.model.js';

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
