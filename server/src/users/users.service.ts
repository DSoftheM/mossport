import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import a from './users.json';

export type User = {
  userId: number;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: 1,
      username: 'john',
      password: 'orange',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async register(username: string, password: string) {
    const buffer = await fs.readFile(__dirname + '/users.json');
    const currentUsers: User[] = JSON.parse(buffer.toString()).users;
    currentUsers.push({ userId: currentUsers.length, username, password });
    await fs.writeFile(
      __dirname + '/users.json',
      JSON.stringify({ users: currentUsers }),
    );
  }
}
