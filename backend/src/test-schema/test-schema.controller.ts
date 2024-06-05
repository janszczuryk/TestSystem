import { Body, ConflictException, Controller, Delete, Get, HttpCode, NotFoundException, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';

import { AccountType } from '@module/account/entities/account.entity';
import { AccountTypes } from '@module/auth/decorators';
import { AccountTypeGuard, JwtAuthGuard } from '@module/auth/guards';
import { SubjectService } from '@module/subject/subject.service';

import { CreateTestSchemaBodyDto } from './dto/create-test-schema-body.dto';
import { UpdateTestSchemaBodyDto } from './dto/update-test-schema-body.dto';
import { TestSchemaCreateProps } from './entities/test-schema.entity';
import { TestSchemaService, TestSchemaServiceUpdateDuplicateError } from './test-schema.service';

@Controller('schemas')
@UseGuards(JwtAuthGuard, AccountTypeGuard)
@AccountTypes([AccountType.TEACHER])
export class TestSchemaController {
  public constructor(
    private readonly testSchemaService: TestSchemaService,
    private readonly subjectService: SubjectService,
  ) {}

  @Post()
  public async create(@Body() body: CreateTestSchemaBodyDto) {
    const existingTestSchema = await this.testSchemaService.find({
      name: body.name,
    });
    if (existingTestSchema) {
      throw new ConflictException('Schema with this name already exists');
    }

    const subject = await this.subjectService.get(body.subjectId);

    if (!subject) {
      throw new NotFoundException('Subject does not exist');
    }

    const props: TestSchemaCreateProps = {
      name: body.name,
      subject: subject,
    };

    return this.testSchemaService.create(props);
  }

  @Get()
  public async findAll() {
    return this.testSchemaService.findAll();
  }

  @Get(':schema_id')
  public async findOne(@Param('schema_id', new ParseUUIDPipe({ version: '4' })) schemaId: string) {
    const testSchema = await this.testSchemaService.get(schemaId);
    if (!testSchema) {
      throw new NotFoundException('Schema does not exist');
    }

    return testSchema;
  }

  @Patch(':schema_id')
  public async update(@Param('schema_id', new ParseUUIDPipe({ version: '4' })) schemaId: string, @Body() body: UpdateTestSchemaBodyDto) {
    let testSchema = await this.testSchemaService.get(schemaId);
    if (!testSchema) {
      throw new NotFoundException('Schema does not exist');
    }

    const subject = await this.subjectService.get(body.subjectId);

    if (!subject) {
      throw new NotFoundException('Subject does not exist');
    }

    const props: TestSchemaCreateProps = {
      name: body.name,
      subject: subject,
    };

    try {
      testSchema = await this.testSchemaService.update(testSchema, props);
    } catch (error) {
      if (error instanceof TestSchemaServiceUpdateDuplicateError) {
        throw new ConflictException(error.message);
      }

      throw error;
    }

    return testSchema;
  }

  @Delete(':schema_id')
  @HttpCode(204)
  public async remove(@Param('schema_id', new ParseUUIDPipe({ version: '4' })) schemaId: string) {
    const testSchema = await this.testSchemaService.get(schemaId);
    if (!testSchema) {
      throw new NotFoundException('Schema does not exist');
    }

    await this.testSchemaService.remove(testSchema);
  }
}
