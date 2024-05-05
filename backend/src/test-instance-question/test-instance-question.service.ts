import { Injectable } from '@nestjs/common';
import { CreateTestInstanceQuestionDto } from './dto/create-test-instance-question.dto';
import { UpdateTestInstanceQuestionDto } from './dto/update-test-instance-question.dto';

@Injectable()
export class TestInstanceQuestionService {
  create(createTestInstanceQuestionDto: CreateTestInstanceQuestionDto) {
    return 'This action adds a new testInstanceQuestion';
  }

  findAll() {
    return `This action returns all testInstanceQuestion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testInstanceQuestion`;
  }

  update(id: number, updateTestInstanceQuestionDto: UpdateTestInstanceQuestionDto) {
    return `This action updates a #${id} testInstanceQuestion`;
  }

  remove(id: number) {
    return `This action removes a #${id} testInstanceQuestion`;
  }
}
