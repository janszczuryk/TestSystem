import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { randomUUID } from 'crypto';

import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountType } from './entities/account.entity';
import { TeacherAccount } from './entities/teacher-account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(TeacherAccount)
    private teacherAccountRepository: Repository<TeacherAccount>,
  ) {}

  public async create(
    createAccountDto: CreateAccountDto,
  ): Promise<TeacherAccount> {
    const teacherAccount = new TeacherAccount();
    teacherAccount.id = randomUUID();
    teacherAccount.isVerified = true;
    teacherAccount.type = AccountType.TEACHER;

    await this.teacherAccountRepository.save(teacherAccount);

    return teacherAccount;
  }

  public async findAll() {
    return 'This action returns all account';
  }

  public async findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  public async update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  public async remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
