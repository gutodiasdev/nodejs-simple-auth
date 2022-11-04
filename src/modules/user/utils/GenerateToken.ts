import { sign } from 'jsonwebtoken';
import auth from '../../../config/auth';

namespace GenerateToken {
  export type Input = {
    userId: string;
  };

  export type Output = { token: string; };
}

export class GenerateToken {
  async perform (input: GenerateToken.Input): Promise<GenerateToken.Output> {
    const token = sign({}, auth.jwt_secret, {
      subject: input.userId,
      expiresIn: '20s'
    });

    return { token };
  }
}