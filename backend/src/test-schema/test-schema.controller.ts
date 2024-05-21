import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { CreateTestSchemaDto } from './dto/create-test-schema.dto';
import { UpdateTestSchemaDto } from './dto/update-test-schema.dto';
import { TestSchemaService } from './test-schema.service';

@Controller('test-schema')
export class TestSchemaController {
  constructor(private readonly testSchemaService: TestSchemaService) {}

  @Post()
  create(@Body() createTestSchemaDto: CreateTestSchemaDto) {
    return this.testSchemaService.create(createTestSchemaDto);
  }

  @Get()
  findAll() {
    return this.testSchemaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testSchemaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestSchemaDto: UpdateTestSchemaDto) {
    return this.testSchemaService.update(+id, updateTestSchemaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testSchemaService.remove(+id);
  }
}
