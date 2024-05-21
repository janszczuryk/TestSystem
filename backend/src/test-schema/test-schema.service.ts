import { Injectable } from '@nestjs/common';

import { CreateTestSchemaDto } from './dto/create-test-schema.dto';
import { UpdateTestSchemaDto } from './dto/update-test-schema.dto';

@Injectable()
export class TestSchemaService {
  create(createTestSchemaDto: CreateTestSchemaDto) {
    return 'This action adds a new testSchema';
  }

  findAll() {
    return 'This action returns all testSchema';
  }

  findOne(id: number) {
    return `This action returns a #${id} testSchema`;
  }

  update(id: number, updateTestSchemaDto: UpdateTestSchemaDto) {
    return `This action updates a #${id} testSchema`;
  }

  remove(id: number) {
    return `This action removes a #${id} testSchema`;
  }
}
