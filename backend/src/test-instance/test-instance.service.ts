import { Injectable } from '@nestjs/common';
import { CreateTestInstanceDto } from './dto/create-test-instance.dto';
import { UpdateTestInstanceDto } from './dto/update-test-instance.dto';

@Injectable()
export class TestInstanceService {
  create(createTestInstanceDto: CreateTestInstanceDto) {
    return 'This action adds a new testInstance';
  }

  findAll() {
    return `This action returns all testInstance`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testInstance`;
  }

  update(id: number, updateTestInstanceDto: UpdateTestInstanceDto) {
    return `This action updates a #${id} testInstance`;
  }

  remove(id: number) {
    return `This action removes a #${id} testInstance`;
  }
}
