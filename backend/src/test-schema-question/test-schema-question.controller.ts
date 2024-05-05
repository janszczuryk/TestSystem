import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TestSchemaQuestionService } from './test-schema-question.service';
import { CreateTestSchemaQuestionDto } from './dto/create-test-schema-question.dto';
import { UpdateTestSchemaQuestionDto } from './dto/update-test-schema-question.dto';

@Controller('test-schema-question')
export class TestSchemaQuestionController {
  constructor(
    private readonly testQuestionService: TestSchemaQuestionService,
  ) {}

  @Post()
  create(@Body() createTestQuestionDto: CreateTestSchemaQuestionDto) {
    return this.testQuestionService.create(createTestQuestionDto);
  }

  @Get()
  findAll() {
    return this.testQuestionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testQuestionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTestQuestionDto: UpdateTestSchemaQuestionDto,
  ) {
    return this.testQuestionService.update(+id, updateTestQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testQuestionService.remove(+id);
  }
}
