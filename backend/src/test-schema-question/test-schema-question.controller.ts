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
import { TestSchemaService } from '@module/test-schema/test-schema.service';

import { CreateTestSchemaQuestionBodyDto } from './dto/create-test-schema-question-body.dto';
import { UpdateTestSchemaQuestionBodyDto } from './dto/update-test-schema-question-body.dto';
import { TestSchemaQuestion } from './entities/test-schema-question.entity';
import { TestSchemaQuestionService } from './test-schema-question.service';

@Controller('schemas/:schema_id/questions')
@UseGuards(JwtAuthGuard, AccountTypeGuard)
@AccountTypes([AccountType.TEACHER])
export class TestSchemaQuestionController {
  public constructor(
    private readonly testSchemaQuestionService: TestSchemaQuestionService,
    private readonly testSchemaService: TestSchemaService,
  ) {}

  @Post()
  public async create(@ParamUUID('schema_id') schemaId: string, @Body() body: CreateTestSchemaQuestionBodyDto) {
    const testSchema = await this.testSchemaService.get(schemaId);
    if (!testSchema) {
      throw new NotFoundException('Schema does not exist');
    }

    const testSchemaQuestion = TestSchemaQuestion.create({
      question: body.question,
      answers: body.answers,
      correctAnswerIndex: body.correctAnswerIndex,
      schema: testSchema,
    });

    return this.testSchemaQuestionService.create(testSchemaQuestion);
  }

  @Get()
  public async findAll(@ParamUUID('schema_id') schemaId: string) {
    return this.testSchemaQuestionService.findAll({
      schema: { id: schemaId },
    });
  }

  @Get(':question_id')
  public async findOne(@ParamUUID('question_id') questionId: string, @ParamUUID('schema_id') schemaId: string) {
    const testSchemaQuestion = await this.testSchemaQuestionService.get(questionId);
    if (!testSchemaQuestion) {
      throw new NotFoundException('Schema question does not exist');
    }

    if (testSchemaQuestion.schema.id !== schemaId) {
      throw new ConflictException('This schema does not contain such question');
    }

    return testSchemaQuestion;
  }

  @Patch(':question_id')
  public async update(
    @ParamUUID('question_id') questionId: string,
    @ParamUUID('schema_id') schemaId: string,
    @Body() body: UpdateTestSchemaQuestionBodyDto,
  ) {
    let testSchemaQuestion = await this.testSchemaQuestionService.get(questionId);
    if (!testSchemaQuestion) {
      throw new NotFoundException('Schema question does not exist');
    }

    if (testSchemaQuestion.schema.id !== schemaId) {
      throw new ConflictException('This schema does not contain such question');
    }

    const testSchema = await this.testSchemaService.get(schemaId);
    if (!testSchema) {
      throw new NotFoundException('Schema does not exist');
    }

    testSchemaQuestion = await this.testSchemaQuestionService.update(testSchemaQuestion, {
      question: body.question,
      answers: body.answers,
      correctAnswerIndex: body.correctAnswerIndex,
      schema: testSchema,
    });

    return testSchemaQuestion;
  }

  @Delete(':question_id')
  @HttpCode(204)
  public async remove(@ParamUUID('question_id') questionId: string, @ParamUUID('schema_id') schemaId: string) {
    const testSchemaQuestion = await this.testSchemaQuestionService.get(questionId);
    if (!testSchemaQuestion) {
      throw new NotFoundException('Schema question does not exist');
    }

    if (testSchemaQuestion.schema.id !== schemaId) {
      throw new ConflictException('This schema does not contain such question');
    }

    await this.testSchemaQuestionService.remove(testSchemaQuestion);
  }
}
