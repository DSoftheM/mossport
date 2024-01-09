import { Injectable } from '@nestjs/common';
import { getUsersJsonPath } from 'data/users';
import * as fs from 'fs/promises';
import { Role } from 'src/auth/guards/roles.guard';

export type User = {
  userId: number;
  surname: string;
  name: string;
  patronymic: string;
  tel: string;
  email: string;
  password: string;
  roles: Role[];
};

export type JwtAuthMetadata = { iat: number; sub: number; exp: number };

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
    await fs.writeFile(getUsersJsonPath(), JSON.stringify({ users: currentUsers }));
  }

  async changePassword(userId: number, newPassword: string) {
    const buffer = await fs.readFile(getUsersJsonPath());
    const currentUsers: User[] = JSON.parse(buffer.toString()).users;

    currentUsers.forEach((user) => {
      if (user.userId === userId) {
        user.password = newPassword;
      }
    });

    await fs.writeFile(getUsersJsonPath(), JSON.stringify({ users: currentUsers }));
  }

  async getAllCouches() {
    const buffer = await fs.readFile(getUsersJsonPath());
    const currentUsers: User[] = JSON.parse(buffer.toString()).users;
    return currentUsers.filter((user) => user.roles.includes(Role.Coach));
  }
}
