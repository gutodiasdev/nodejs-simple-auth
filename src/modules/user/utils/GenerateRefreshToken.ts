import dayjs from 'dayjs';
import { prismaClient } from '../../../config/prisma';

namespace GenerateRefreshToken {
  export type Input = { userId: string; };
  export type Output = {
    id: string;
    expiresIn: number;
    userId: string;
  };
}

export class GenerateRefreshToken {

  async perform (input: GenerateRefreshToken.Input): Promise<GenerateRefreshToken.Output> {
    const expiresIn = dayjs().add(30, 'days').unix();

    const generatedRefreshToken = await prismaClient.refreshToken.create({
      data: {
        userId: input.userId,
        expiresIn
      }
    });

    return {
      id: generatedRefreshToken.id,
      expiresIn: generatedRefreshToken.expiresIn,
      userId: generatedRefreshToken.userId
    };
  }
}