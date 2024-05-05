import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TestInstanceService } from './test-instance.service';
import { CreateTestInstanceDto } from './dto/create-test-instance.dto';
import { UpdateTestInstanceDto } from './dto/update-test-instance.dto';

@Controller('test-instance')
export class TestInstanceController {
  constructor(private readonly testInstanceService: TestInstanceService) {}

  @Post()
  create(@Body() createTestInstanceDto: CreateTestInstanceDto) {
    return this.testInstanceService.create(createTestInstanceDto);
  }

  @Get()
  findAll() {
    return this.testInstanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testInstanceService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTestInstanceDto: UpdateTestInstanceDto,
  ) {
    return this.testInstanceService.update(+id, updateTestInstanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testInstanceService.remove(+id);
  }
}
