import { Injectable } from '@nestjs/common';

import { CreateTestSchemaQuestionDto } from './dto/create-test-schema-question.dto';
import { UpdateTestSchemaQuestionDto } from './dto/update-test-schema-question.dto';

@Injectable()
export class TestSchemaQuestionService {
  create(createTestQuestionDto: CreateTestSchemaQuestionDto) {
    return 'This action adds a new testQuestion';
  }

  findAll() {
    return 'This action returns all testQuestion';
  }

  findOne(id: number) {
    return `This action returns a #${id} testQuestion`;
  }

  update(id: number, updateTestQuestionDto: UpdateTestSchemaQuestionDto) {
    return `This action updates a #${id} testQuestion`;
  }

  remove(id: number) {
    return `This action removes a #${id} testQuestion`;
  }
}
