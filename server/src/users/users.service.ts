import { Injectable } from '@nestjs/common';
import { getUsersJsonPath } from 'data/users';
import * as fs from 'fs/promises';

export type User = {
  userId: number;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  async findOne(username: string): Promise<User | undefined> {
    const buffer = await fs.readFile(getUsersJsonPath());
    const currentUsers: User[] = JSON.parse(buffer.toString()).users;
    return currentUsers.find((user) => user.username === username);
  }

  async register(username: string, password: string) {
    const buffer = await fs.readFile(getUsersJsonPath());
    const currentUsers: User[] = JSON.parse(buffer.toString()).users;
    currentUsers.push({ userId: currentUsers.length, username, password });
    await fs.writeFile(
      getUsersJsonPath(),
      JSON.stringify({ users: currentUsers }),
    );
  }
}
