import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AccountType } from '@module/account/entities/account.entity';
import { AccountTypes } from '@module/auth/decorators';
import { AccountTypeGuard, JwtAuthGuard } from '@module/auth/guards';
import { ParamUUID } from '@module/common/decorators';
import { SubjectService } from '@module/subject/subject.service';

import { CreateTestSchemaBodyDto, UpdateTestSchemaBodyDto } from './dto/body';
import { TestSchemaResponseDto } from './dto/response';
import { TestSchema } from './entities/test-schema.entity';
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

    let testSchema = TestSchema.create({
      name: body.name,
      subject: subject,
    });
    testSchema = await this.testSchemaService.create(testSchema);

    return new TestSchemaResponseDto(testSchema);
  }

  @Get()
  public async findAll() {
    const testSchemas = await this.testSchemaService.findAll();

    return testSchemas.map((testSchema) => new TestSchemaResponseDto(testSchema));
  }

  @Get(':schema_id')
  public async findOne(@ParamUUID('schema_id') schemaId: string) {
    const testSchema = await this.testSchemaService.get(schemaId);
    if (!testSchema) {
      throw new NotFoundException('Schema does not exist');
    }

    return new TestSchemaResponseDto(testSchema);
  }

  @Patch(':schema_id')
  public async update(@ParamUUID('schema_id') schemaId: string, @Body() body: UpdateTestSchemaBodyDto) {
    let testSchema = await this.testSchemaService.get(schemaId);
    if (!testSchema) {
      throw new NotFoundException('Schema does not exist');
    }

    const subject = await this.subjectService.get(body.subjectId);
    if (!subject) {
      throw new NotFoundException('Subject does not exist');
    }

    try {
      testSchema = await this.testSchemaService.update(testSchema, {
        name: body.name,
        subject: subject,
      });
    } catch (error) {
      if (error instanceof TestSchemaServiceUpdateDuplicateError) {
        throw new ConflictException(error.message);
      }

      throw error;
    }

    return new TestSchemaResponseDto(testSchema);
  }

  @Delete(':schema_id')
  @HttpCode(204)
  public async remove(@ParamUUID('schema_id') schemaId: string) {
    const testSchema = await this.testSchemaService.get(schemaId);
    if (!testSchema) {
      throw new NotFoundException('Schema does not exist');
    }

    await this.testSchemaService.remove(testSchema);
  }
}
