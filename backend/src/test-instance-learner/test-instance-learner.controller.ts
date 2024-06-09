import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { CreateTestInstanceLearnerDto } from './dto/create-test-instance-learner.dto';
import { UpdateTestInstanceLearnerDto } from './dto/update-test-instance-learner.dto';
import { TestInstanceLearnerService } from './test-instance-learner.service';

@Controller('test-instance-learner')
export class TestInstanceLearnerController {
  constructor(private readonly testInstanceLearnerService: TestInstanceLearnerService) {}

  @Post()
  create(@Body() createTestInstanceLearnerDto: CreateTestInstanceLearnerDto) {
    // return this.testInstanceLearnerService.create(createTestInstanceLearnerDto);
  }

  @Get()
  findAll() {
    // return this.testInstanceLearnerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.testInstanceLearnerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestInstanceLearnerDto: UpdateTestInstanceLearnerDto) {
    // return this.testInstanceLearnerService.update(+id, updateTestInstanceLearnerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.testInstanceLearnerService.remove(+id);
  }
}
