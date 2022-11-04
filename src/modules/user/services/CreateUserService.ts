import { hash } from 'bcryptjs';
import { prismaClient } from '../../../config/prisma';

namespace CreateUser {
  export type Input = {
    name: string;
    username: string;
    email: string;
    password: string;
  };

  export type Output = void;
}

export class CreateUserService {

  async perform (input: CreateUser.Input): Promise<CreateUser.Output> {

    const emailAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: input.email
      }
    });

    if (emailAlreadyExists) {
      throw new Error('User already exists!');
    }

    const encryptedPassword = await hash(input.password, 8);

    await prismaClient.user.create({
      data: {
        email: input.email,
        username: input.username,
        password: encryptedPassword,
        name: input.name,
      }
    });

  }
}