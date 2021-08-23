import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './user.entity';

@Injectable()
  export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async markEmailAsConfirmed(email: string) {
    return this.usersRepository.update({ email }, {
      isEmailConfirmed: true
    });
  }
  async getByEmail(Email: string) {
    return await this.usersRepository.findOne({ email: Email });
  }

  async getById(Id: number) {
    return await this.usersRepository.findOne({ id: Id });
  }
}

/*export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        id: '1',
        username: 'john',
        password: 'testme',
        email: 'sirapopjpt@gmail.com',
        isEmailConfirmed: false,
      },
      {
        id: '2',
        username: 'mary',
        password: 'ishappy',
      },
      {
        id: '10',
        username: 'bob',
        password: 'hungry',
      }
    ]
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}*/
