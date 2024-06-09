import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { Account, AccountType, AccountTypeMapping, AccountUpdateProps } from './entities/account.entity';

export class AccountServiceError extends Error {}

export class AccountServiceUpdateError extends AccountServiceError {}

export class AccountServiceUpdateDuplicateError extends AccountServiceUpdateError {}

@Injectable()
export class AccountService {
  public constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  public async get<T extends AccountType>(id: string, type?: T): Promise<AccountTypeMapping[T] | null> {
    const account = await this.accountRepository.findOne({
      where: { id },
    });

    if (!account || (type && account.type !== type)) {
      return null;
    }

    return account as AccountTypeMapping[T];
  }

  public async find(findOptions: FindOptionsWhere<Account>): Promise<Account | null> {
    return this.accountRepository.findOne({
      where: findOptions,
    });
  }

  public async create(account: Account): Promise<Account> {
    return this.accountRepository.save(account);
  }

  public async update(account: Account, props: AccountUpdateProps): Promise<Account> {
    const existingAccount = await this.accountRepository.findOneBy({
      email: props.email || account.email,
    });
    if (existingAccount && existingAccount.id !== account.id) {
      throw new AccountServiceUpdateDuplicateError('Account with this email already exists');
    }

    account.update(props);

    return this.accountRepository.save(account);
  }
}
