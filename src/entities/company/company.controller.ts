import { Router, Request, Response, NextFunction } from 'express';
import { CompanyService } from './company.service.js';
import { validateBody } from '../../middlewares/validateBodyWithSchema.js';
import { companySchema } from './company.schema.js';

const companyController = Router();
const companyService = new CompanyService();

companyController.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await companyService.getAll();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
);

companyController.get(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const companyId = req.params.id;
    try {
      const company = await companyService.getById(companyId);
      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }
      res.status(200).json(company);
    } catch (error) {
      next(error);
    }
  }
);

companyController.post(
  '/',
  validateBody(companySchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newCompany = await companyService.create(req.body);
      res.status(201).json(newCompany);
    } catch (error) {
      next(error);
    }
  }
);

companyController.put(
  '/:id',
  validateBody(companySchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const companyId = req.params.id;
    try {
      const updatedCompany = await companyService.update(companyId, req.body);
      res.status(200).json(updatedCompany);
    } catch (error) {
      next(error);
    }
  }
);

companyController.delete(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const companyId = req.params.id;
    try {
      await companyService.delete(companyId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

export default companyController;
