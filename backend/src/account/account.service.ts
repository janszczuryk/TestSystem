import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { randomUUID } from 'crypto';

import { Account, AccountCreateProps, AccountUpdateProps } from './entities/account.entity';

@Injectable()
export class AccountService {
  public constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  public async find(id: string): Promise<Account | null> {
    return this.accountRepository.findOneBy({ id });
  }

  public async findByEmail(email: string): Promise<Account | null> {
    return this.accountRepository.findOneBy({ email });
  }

  public async create(props: AccountCreateProps): Promise<Account> {
    const now = new Date();

    const account = this.accountRepository.create({
      id: randomUUID(),
      ...props,
      updatedAt: now,
      createdAt: now,
    });

    return this.accountRepository.save(account);
  }

  public async update(account: Account, props: AccountUpdateProps): Promise<Account> {
    Object.assign(account, props);

    return this.accountRepository.save(account);
  }
}
