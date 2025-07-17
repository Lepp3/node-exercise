import { Router } from 'express';
import userController from '../entities/user/user.controller.js';
import companyController from '../entities/company/company.controller.js';
import warehouseController from '../entities/warehouse/warehouse.controller.js';
import partnerController from '../entities/partner/partner.controller.js';
import orderController from '../entities/order/order.controller.js';
import invoiceController from '../entities/invoice/invoice.controller.js';
import orderItemsController from '../entities/orderItems/orderItems.controller.js';
import productController from '../entities/product/product.controller.js';

const apiRouter = Router();

apiRouter.use('/user', userController);
apiRouter.use('/company', companyController);
apiRouter.use('/partner', partnerController);
apiRouter.use('/product', productController);
apiRouter.use('/invoice', invoiceController);
apiRouter.use('/order', orderController);
apiRouter.use('/order-items', orderItemsController);
apiRouter.use('/warehouse', warehouseController);

export default apiRouter;
