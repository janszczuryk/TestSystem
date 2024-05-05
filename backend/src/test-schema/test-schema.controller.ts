import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestSchemaService } from './test-schema.service';
import { CreateTestSchemaDto } from './dto/create-test-schema.dto';
import { UpdateTestSchemaDto } from './dto/update-test-schema.dto';

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
