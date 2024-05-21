import { Injectable } from '@nestjs/common';

import { CreateTestInstanceResultDto } from './dto/create-test-instance-result.dto';
import { UpdateTestInstanceResultDto } from './dto/update-test-instance-result.dto';

@Injectable()
export class TestInstanceResultService {
  create(createTestInstanceResultDto: CreateTestInstanceResultDto) {
    return 'This action adds a new testInstanceResult';
  }

  findAll() {
    return 'This action returns all testInstanceResult';
  }

  findOne(id: number) {
    return `This action returns a #${id} testInstanceResult`;
  }

  update(id: number, updateTestInstanceResultDto: UpdateTestInstanceResultDto) {
    return `This action updates a #${id} testInstanceResult`;
  }

  remove(id: number) {
    return `This action removes a #${id} testInstanceResult`;
  }
}
