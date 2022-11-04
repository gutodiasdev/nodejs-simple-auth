import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import auth from '../../../config/auth';
import { prismaClient } from '../../../config/prisma';
import { GenerateRefreshToken } from '../utils/GenerateRefreshToken';
import { GenerateToken } from '../utils/GenerateToken';

const generateRefreshToken = new GenerateRefreshToken();
const generateToken = new GenerateToken();

namespace AuthenticateUser {
  export type Input = {
    email?: string;
    username?: string;
    password: string;
  };

  export type Output = {
    token: string;
    refreshToken: {
      id: string;
      expiresIn: number;
      userId: string;
    };
  };
}

export class AuthenticateUserService {

  async perform (input: AuthenticateUser.Input): Promise<AuthenticateUser.Output> {

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        OR: [
          {
            email: input.email
          },
          {
            username: input.username
          }
        ]
      }
    });

    if (!userAlreadyExists) {
      throw new Error('Username, email or password are incorrect.');
    }

    const passwordMatch = await compare(input.password, userAlreadyExists.password);

    if (!passwordMatch) {
      throw new Error('Username, email or password are incorrect.');
    }

    await prismaClient.refreshToken.deleteMany({
      where: {
        userId: userAlreadyExists.id
      }
    });

    const refreshToken = await generateRefreshToken.perform({ userId: userAlreadyExists.id });
    const { token } = await generateToken.perform({ userId: userAlreadyExists.id });

    return {
      token,
      refreshToken
    };
  }
}