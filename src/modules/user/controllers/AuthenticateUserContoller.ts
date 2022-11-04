import { Request, Response } from 'express';
import { AuthenticateUserService } from '../services/AuthenticateUserService';

class AuthenticateUserController {
  async handle (request: Request, response: Response): Promise<Response> {
    const authenticateUserService = new AuthenticateUserService();
    const token = await authenticateUserService.perform(request.body);
    return response.status(200).json(token);
  }
}

export const authenticateUserController = new AuthenticateUserController();