import { Injectable } from '@nestjs/common';
import { getUsersJsonPath } from 'data/users';
import * as fs from 'fs/promises';

export type User = {
  userId: number;
  surname: string;
  name: string;
  patronymic: string;
  tel: string;
  email: string;
  password: string;
};

export function isUser(data: any): data is User {
  return Boolean(data.email);
}

@Injectable()
export class UsersService {
  async findOne(email: string): Promise<User | undefined> {
    const buffer = await fs.readFile(getUsersJsonPath());
    const currentUsers: User[] = JSON.parse(buffer.toString()).users;
    return currentUsers.find((user) => user.email === email);
  }

  async register(user: User) {
    const buffer = await fs.readFile(getUsersJsonPath());
    const currentUsers: User[] = JSON.parse(buffer.toString()).users;
    if (user.userId === undefined) {
      user.userId = currentUsers.length;
    }
    currentUsers.push(user);
    await fs.writeFile(
      getUsersJsonPath(),
      JSON.stringify({ users: currentUsers }),
    );
  }
}
