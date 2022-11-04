import { Request, Response } from 'express';
import { RefreshTokenService } from '../services';

const refreshTokenService = new RefreshTokenService();

class RefreshTokenController {

  async handle (request: Request, response: Response): Promise<Response> {
    const { refresh_token } = request.body as { refresh_token: string; };

    const token = await refreshTokenService.perform({ refreshToken: refresh_token });
    return response.status(200).json(token);
  }
}

export const refreshTokenController = new RefreshTokenController();