import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AccountType } from '@module/account/entities/account.entity';
import { AccountTypes } from '@module/auth/decorators';
import { AccountTypeGuard, JwtAuthGuard } from '@module/auth/guards';
import { TestSchemaService } from '@module/test-schema/test-schema.service';

import { CreateTestSchemaQuestionBodyDto } from './dto/create-test-schema-question-body.dto';
import { UpdateTestSchemaQuestionBodyDto } from './dto/update-test-schema-question-body.dto';
import { TestSchemaQuestionCreateProps, TestSchemaQuestionUpdateProps } from './entities/test-schema-question.entity';
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
  public async create(
    @Param('schema_id', new ParseUUIDPipe({ version: '4' })) schemaId: string,
    @Body() body: CreateTestSchemaQuestionBodyDto,
  ) {
    const testSchema = await this.testSchemaService.get(schemaId);
    if (!testSchema) {
      throw new NotFoundException('Schema does not exist');
    }

    const props: TestSchemaQuestionCreateProps = {
      question: body.question,
      answers: body.answers,
      correctAnswerIndex: body.correctAnswerIndex,
      schema: testSchema,
    };

    return this.testSchemaQuestionService.create(props);
  }

  @Get()
  public async findAll(@Param('schema_id', new ParseUUIDPipe({ version: '4' })) schemaId: string) {
    return this.testSchemaQuestionService.findAll({
      schema: { id: schemaId },
    });
  }

  @Get(':question_id')
  public async findOne(
    @Param('question_id', new ParseUUIDPipe({ version: '4' })) questionId: string,
    @Param('schema_id', new ParseUUIDPipe({ version: '4' })) schemaId: string,
  ) {
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
    @Param('question_id', new ParseUUIDPipe({ version: '4' })) questionId: string,
    @Param('schema_id', new ParseUUIDPipe({ version: '4' })) schemaId: string,
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

    const props: TestSchemaQuestionUpdateProps = {
      question: body.question,
      answers: body.answers,
      correctAnswerIndex: body.correctAnswerIndex,
      schema: testSchema,
    };

    testSchemaQuestion = await this.testSchemaQuestionService.update(testSchemaQuestion, props);

    return testSchemaQuestion;
  }

  @Delete(':question_id')
  @HttpCode(204)
  public async remove(
    @Param('question_id', new ParseUUIDPipe({ version: '4' })) questionId: string,
    @Param('schema_id', new ParseUUIDPipe({ version: '4' })) schemaId: string,
  ) {
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
