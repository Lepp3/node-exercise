import { Router, Request, Response } from 'express';
import { UserService } from './user.service.js';

const userController = Router();
const userService = new UserService();

userController.get('/', async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

userController.get('/:id', async (req: Request, res: Response) => {
  const companyId = req.params.id;
  try {
    const company = await userService.getUserById(companyId);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json(error);
  }
});

userController.post('/', async (req: Request, res: Response) => {
  const newCompanyInfo = req.body;
  try {
    const newCompany = await userService.createUser(newCompanyInfo);
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(500).json(error);
  }
});

userController.put('/:id', async (req: Request, res: Response) => {
  const companyId = req.params.id;
  const updatedInfo = req.body;
  try {
    const updatedCompany = await userService.updateUser(companyId, updatedInfo);
    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(500).json(error);
  }
});

userController.delete('/:id', async (req: Request, res: Response) => {
  const companyId = req.params.id;
  try {
    await userService.deleteUser(companyId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json(error);
  }
});
