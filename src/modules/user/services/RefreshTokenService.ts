import dayjs from 'dayjs';
import { prismaClient } from '../../../config/prisma';
import { GenerateRefreshToken, GenerateToken } from '../utils';

const generateToken = new GenerateToken();
const generateRefreshToken = new GenerateRefreshToken();

namespace RefreshToken {
  export type Input = {
    refreshToken: string;
  };

  export type Output = {
    token: string;
    refreshToken?: string;
  };
}

export class RefreshTokenService {

  async perform (input: RefreshToken.Input): Promise<RefreshToken.Output> {

    const refreshToken = await prismaClient.refreshToken.findUnique({
      where: {
        id: input.refreshToken
      }
    });

    if (!refreshToken) {
      throw new Error('Refresh token invalid');
    }

    const { token } = await generateToken.perform({ userId: refreshToken.userId });

    const isRefreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn));

    if (isRefreshTokenExpired) {
      await prismaClient.refreshToken.deleteMany({
        where: {
          userId: refreshToken.userId
        }
      });

      const { id } = await generateRefreshToken.perform({ userId: refreshToken.userId });

      return {
        token,
        refreshToken: id
      };
    }

    return {
      token
    };
  }
}