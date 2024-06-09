import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { CreateTestInstanceLearnerAnswerDto } from './dto/create-test-instance-learner-answer.dto';
import { UpdateTestInstanceLearnerAnswerDto } from './dto/update-test-instance-learner-answer.dto';
import { TestInstanceLearnerAnswerService } from './test-instance-learner-answer.service';

@Controller('test-instance-learner-answer')
export class TestInstanceLearnerAnswerController {
  constructor(private readonly testInstanceLearnerAnswerService: TestInstanceLearnerAnswerService) {}

  @Post()
  create(@Body() createTestInstanceLearnerAnswerDto: CreateTestInstanceLearnerAnswerDto) {
    // return this.testInstanceLearnerAnswerService.create(createTestInstanceLearnerAnswerDto);
  }

  @Get()
  findAll() {
    // return this.testInstanceLearnerAnswerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.testInstanceLearnerAnswerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestInstanceLearnerAnswerDto: UpdateTestInstanceLearnerAnswerDto) {
    // return this.testInstanceLearnerAnswerService.update(+id, updateTestInstanceLearnerAnswerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.testInstanceLearnerAnswerService.remove(+id);
  }
}
