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

import { CreateTestSchemaQuestionBodyDto, UpdateTestSchemaQuestionBodyDto } from './dto/body';
import { TestSchemaQuestionResponseDto } from './dto/response';
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

    let testSchemaQuestion = TestSchemaQuestion.create({
      question: body.question,
      answers: body.answers,
      correctAnswerIndex: body.correctAnswerIndex,
      schema: testSchema,
    });
    testSchemaQuestion = await this.testSchemaQuestionService.create(testSchemaQuestion);

    return new TestSchemaQuestionResponseDto(testSchemaQuestion);
  }

  @Get()
  public async findAll(@ParamUUID('schema_id') schemaId: string) {
    const testSchemaQuestions = await this.testSchemaQuestionService.findAll({
      schema: { id: schemaId },
    });

    return testSchemaQuestions.map((testSchemaQuestion) => new TestSchemaQuestionResponseDto(testSchemaQuestion));
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

    return new TestSchemaQuestionResponseDto(testSchemaQuestion);
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

    return new TestSchemaQuestionResponseDto(testSchemaQuestion);
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
