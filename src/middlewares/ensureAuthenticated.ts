import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '../config/auth';

export function ensureAuthenticated (request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({ message: 'Unauthorized. Token is missing.' });
  }

  const [, token] = authToken.split(' ');

  try {
    verify(token, auth.jwt_secret);

    return next();
  } catch (error) {
    return response.status(401).json({
      message: 'Token invalid!'
    });
  }
}