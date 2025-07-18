import { Router, Request, Response, NextFunction } from 'express';
import { PartnerService } from './partner.service.js';
import { validateBody } from '../../middlewares/validateBodyWithSchema.js';
import { partnerSchema } from './partner.schema.js';

const partnerController = Router();
const partnerService = new PartnerService();

partnerController.get(
  '/loyal',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const loyalCustomer = await partnerService.getLoyalCustomer();
      res.status(200).json(loyalCustomer);
    } catch (error) {
      next(error);
    }
  }
);

partnerController.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const partners = await partnerService.getAll();
      res.status(200).json(partners);
    } catch (error) {
      next(error);
    }
  }
);

partnerController.get(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const partnerId = req.params.id;
    try {
      const partner = await partnerService.getById(partnerId);
      res.status(200).json(partner);
    } catch (error) {
      next(error);
    }
  }
);

partnerController.post(
  '/',
  validateBody(partnerSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newPartner = await partnerService.create(req.body);
      res.status(201).json(newPartner);
    } catch (error) {
      next(error);
    }
  }
);

partnerController.put(
  '/:id',
  validateBody(partnerSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const partnerId = req.params.id;
    try {
      const updatedPartner = await partnerService.update(partnerId, req.body);
      res.status(200).json(updatedPartner);
    } catch (error) {
      next(error);
    }
  }
);

partnerController.delete(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const partnerId = req.params.id;
    try {
      await partnerService.delete(partnerId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

export default partnerController;
