import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { CreateTestInstanceResultDto } from './dto/create-test-instance-result.dto';
import { UpdateTestInstanceResultDto } from './dto/update-test-instance-result.dto';
import { TestInstanceResultService } from './test-instance-result.service';

@Controller('test-instance-result')
export class TestInstanceResultController {
  constructor(private readonly testInstanceResultService: TestInstanceResultService) {}

  @Post()
  create(@Body() createTestInstanceResultDto: CreateTestInstanceResultDto) {
    return this.testInstanceResultService.create(createTestInstanceResultDto);
  }

  @Get()
  findAll() {
    return this.testInstanceResultService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testInstanceResultService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestInstanceResultDto: UpdateTestInstanceResultDto) {
    return this.testInstanceResultService.update(+id, updateTestInstanceResultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testInstanceResultService.remove(+id);
  }
}
