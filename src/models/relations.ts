import UserModel from '../entities/user/user.model.js';
import CompanyModel from '../entities/company/company.model.js';
import OrderModel from '../order.model.js';
import OrderItemsModel from '../entities/orderItems/orderItems.model.js';
import InvoiceModel from '../entities/invoice/invoice.model.js';
import WarehouseModel from '../entities/warehouse/warehouse.model.js';
import PartnerModel from '../partner.model.js';
import ProductModel from '../product.model.js';

export function defineAssociations(): void {
  UserModel.belongsTo(CompanyModel, {
    foreignKey: 'companyId',
    as: 'company',
  });

  CompanyModel.hasMany(UserModel, {
    foreignKey: 'companyId',
    as: 'users',
  });

  WarehouseModel.belongsTo(CompanyModel, {
    foreignKey: 'companyId',
    as: 'company',
  });

  CompanyModel.hasMany(WarehouseModel, {
    foreignKey: 'companyId',
    as: 'warehouses',
  });

  ProductModel.belongsTo(CompanyModel, {
    foreignKey: 'companyId',
    as: 'company',
  });

  CompanyModel.hasMany(ProductModel, {
    foreignKey: 'companyId',
    as: 'products',
  });

  PartnerModel.belongsTo(CompanyModel, {
    foreignKey: 'companyId',
    as: 'company',
  });

  CompanyModel.hasMany(PartnerModel, {
    foreignKey: 'companyId',
    as: 'partners',
  });

  OrderModel.belongsTo(CompanyModel, {
    foreignKey: 'companyId',
    as: 'company',
  });

  CompanyModel.hasMany(OrderModel, {
    foreignKey: 'companyId',
    as: 'orders',
  });

  WarehouseModel.belongsTo(UserModel, {
    foreignKey: 'modifiedBy',
    as: 'modifier',
  });

  UserModel.hasMany(WarehouseModel, {
    foreignKey: 'modifiedBy',
    as: 'modifiedWarehouses',
  });

  ProductModel.belongsTo(UserModel, {
    foreignKey: 'modifiedBy',
    as: 'modifier',
  });

  UserModel.hasMany(ProductModel, {
    foreignKey: 'modifiedBy',
    as: 'modifiedProducts',
  });

  PartnerModel.belongsTo(UserModel, {
    foreignKey: 'modifiedBy',
    as: 'modifier',
  });

  UserModel.hasMany(PartnerModel, {
    foreignKey: 'modifiedBy',
    as: 'modifiedPartners',
  });

  OrderItemsModel.belongsTo(UserModel, {
    foreignKey: 'modifiedBy',
    as: 'modifier',
  });

  UserModel.hasMany(OrderItemsModel, {
    foreignKey: 'modifiedBy',
    as: 'modifiedOrderItems',
  });

  UserModel.belongsTo(UserModel, {
    foreignKey: 'modifiedBy',
    as: 'modifier',
  });

  UserModel.hasMany(UserModel, {
    foreignKey: 'modifiedBy',
    as: 'modifiedUsers',
  });

  InvoiceModel.belongsTo(UserModel, {
    foreignKey: 'modifiedBy',
    as: 'modifier',
  });

  UserModel.hasMany(InvoiceModel, {
    foreignKey: 'modifiedBy',
    as: 'modifiedInvoices',
  });

  OrderModel.belongsTo(UserModel, {
    foreignKey: 'modifiedBy',
    as: 'modifier',
  });

  UserModel.hasMany(OrderModel, {
    foreignKey: 'modifiedBy',
    as: 'modifiedOrders',
  });

  OrderModel.belongsTo(PartnerModel, {
    foreignKey: 'partnerId',
    as: 'partner',
  });

  PartnerModel.hasMany(OrderModel, {
    foreignKey: 'partnerId',
    as: 'orders',
  });

  OrderModel.belongsTo(WarehouseModel, {
    foreignKey: 'warehouseId',
    as: 'warehouse',
  });

  WarehouseModel.hasMany(OrderModel, {
    foreignKey: 'warehouseId',
    as: 'orders',
  });

  OrderModel.hasMany(OrderItemsModel, {
    foreignKey: 'orderId',
    as: 'items',
  });

  OrderItemsModel.belongsTo(OrderModel, {
    foreignKey: 'orderId',
    as: 'order',
  });

  InvoiceModel.belongsTo(OrderModel, {
    foreignKey: 'orderId',
    as: 'order',
  });

  OrderModel.hasOne(InvoiceModel, {
    foreignKey: 'orderId',
    as: 'invoice',
  });

  ProductModel.hasMany(OrderItemsModel, {
    foreignKey: 'productId',
    as: 'orderItems',
  });

  OrderItemsModel.belongsTo(ProductModel, {
    foreignKey: 'productId',
    as: 'product',
  });
}
