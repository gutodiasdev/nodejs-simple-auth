import { Request, response, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';

export class CreateUserContoller {

  async handle (request: Request, response: Response): Promise<Response> {
    const authenticateUserService = new CreateUserService();
    await authenticateUserService.perform(request.body);

    return response.status(201).json({ message: 'User created' });
  }
}

export const createUserContoller = new CreateUserContoller();