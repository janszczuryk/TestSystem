import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateTestInstanceQuestionDto } from './dto/create-test-instance-question.dto';
import { UpdateTestInstanceQuestionDto } from './dto/update-test-instance-question.dto';
import { TestInstanceQuestionService } from './test-instance-question.service';

@Controller('test-instance-question')
export class TestInstanceQuestionController {
  constructor(
    private readonly testInstanceQuestionService: TestInstanceQuestionService,
  ) {}

  @Post()
  create(@Body() createTestInstanceQuestionDto: CreateTestInstanceQuestionDto) {
    return this.testInstanceQuestionService.create(
      createTestInstanceQuestionDto,
    );
  }

  @Get()
  findAll() {
    return this.testInstanceQuestionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testInstanceQuestionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTestInstanceQuestionDto: UpdateTestInstanceQuestionDto,
  ) {
    return this.testInstanceQuestionService.update(
      +id,
      updateTestInstanceQuestionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testInstanceQuestionService.remove(+id);
  }
}
