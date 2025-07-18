import { Router, Request, Response, NextFunction } from 'express';
import { ProductService } from './product.service.js';
import { validateBody } from '../../middlewares/validateBodyWithSchema.js';
import { productSchema } from './product.schema.js';

const productController = Router();
const productService = new ProductService();

productController.get(
  '/best-selling',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bestSeller = await productService.getBestSellingProduct();
      res.status(200).json(bestSeller);
    } catch (error) {
      next(error);
    }
  }
);

productController.get(
  '/max-stock',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const maxProducts = await productService.getMaxStockProduct();
      res.status(200).json(maxProducts);
    } catch (error) {
      next(error);
    }
  }
);

productController.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await productService.getAll();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
);

productController.get(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.id;
    try {
      const product = await productService.getById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
);

productController.post(
  '/',
  validateBody(productSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newProduct = await productService.create(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

productController.put(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.id;
    try {
      const updatedProduct = await productService.update(productId, req.body);
      res.status(200).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }
);

productController.delete(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.id;
    try {
      await productService.delete(productId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

export default productController;
