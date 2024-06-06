import {
  Body,
  ConflictException,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AccountService } from '@module/account/account.service';
import { AccountType } from '@module/account/entities/account.entity';
import { JwtParams } from '@module/auth/auth.type';
import { AccountTypes, AuthJwt } from '@module/auth/decorators';
import { AccountTypeGuard, JwtAuthGuard } from '@module/auth/guards';
import { ParamUUID } from '@module/common/decorators';
import { TestSchemaService } from '@module/test-schema/test-schema.service';

import { CreateTestInstanceBodyDto, UpdateTestInstanceBodyDto } from './dto/body';
import { TestInstanceResponseDto } from './dto/response';
import { TestInstance } from './entities/test-instance.entity';
import {
  TestInstanceService,
  TestInstanceServiceRandomizeQuestionsCreateError,
  TestInstanceServiceRandomizeQuestionsUpdateError,
} from './test-instance.service';

@Controller('schemas/:schema_id/instances')
@UseGuards(JwtAuthGuard, AccountTypeGuard)
@AccountTypes([AccountType.TEACHER])
export class TestInstanceController {
  public constructor(
    private readonly testInstanceService: TestInstanceService,
    private readonly testSchemaService: TestSchemaService,
    private readonly accountService: AccountService,
  ) {}

  @Post()
  public async create(
    @ParamUUID('schema_id') schemaId: string,
    @Body() body: CreateTestInstanceBodyDto,
    @AuthJwt() { accountId }: JwtParams,
  ) {
    const testSchema = await this.testSchemaService.get(schemaId);
    if (!testSchema) {
      throw new NotFoundException('Schema does not exist');
    }

    const teacher = await this.accountService.get(accountId, AccountType.TEACHER);
    if (!teacher) {
      throw new Error('Teacher account does not exist');
    }

    if (!teacher.isVerified) {
      throw new ForbiddenException('Teacher account is not verified');
    }

    let testInstance = TestInstance.create({
      isEnabled: body.isEnabled,
      questionsCount: body.questionsCount,
      schema: testSchema,
      teacher: teacher,
    });

    try {
      testInstance = await this.testInstanceService.create(testInstance);
    } catch (error) {
      if (error instanceof TestInstanceServiceRandomizeQuestionsCreateError) {
        throw new ConflictException(error.message);
      }

      throw error;
    }

    return new TestInstanceResponseDto(testInstance);
  }

  @Get()
  public async findAll(@ParamUUID('schema_id') schemaId: string) {
    const testSchema = await this.testSchemaService.get(schemaId);
    if (!testSchema) {
      throw new NotFoundException('Schema does not exist');
    }

    const testInstances = await this.testInstanceService.findAll({
      schema: { id: schemaId },
    });

    return testInstances.map((testInstance) => new TestInstanceResponseDto(testInstance));
  }

  @Get(':instance_id')
  public async findOne(@ParamUUID('instance_id') instanceId: string, @ParamUUID('schema_id') schemaId: string) {
    const testInstance = await this.testInstanceService.get(instanceId);
    if (!testInstance) {
      throw new NotFoundException('Instance does not exist');
    }

    if (testInstance.schema.id !== schemaId) {
      throw new NotFoundException('Instance does not exist for this schema');
    }

    return new TestInstanceResponseDto(testInstance);
  }

  @Patch(':instance_id')
  public async update(
    @ParamUUID('instance_id') instanceId: string,
    @ParamUUID('schema_id') schemaId: string,
    @Body() body: UpdateTestInstanceBodyDto,
    @AuthJwt() { accountId }: JwtParams,
  ) {
    let testInstance = await this.testInstanceService.get(instanceId);
    if (!testInstance) {
      throw new NotFoundException('Instance does not exist');
    }

    if (testInstance.schema.id !== schemaId) {
      throw new NotFoundException('Instance does not exist for this schema');
    }

    const teacher = await this.accountService.get(accountId, AccountType.TEACHER);
    if (!teacher) {
      throw new Error('Teacher account does not exist');
    }

    if (!teacher.isVerified) {
      throw new ForbiddenException('Teacher account is not verified');
    }

    try {
      testInstance = await this.testInstanceService.update(testInstance, {
        isEnabled: body.isEnabled,
        questionsCount: body.questionsCount,
      });
    } catch (error) {
      if (error instanceof TestInstanceServiceRandomizeQuestionsUpdateError) {
        throw new ConflictException(error.message);
      }

      throw error;
    }

    return new TestInstanceResponseDto(testInstance);
  }

  @Delete(':instance_id')
  @HttpCode(204)
  public async remove(
    @ParamUUID('instance_id') instanceId: string,
    @ParamUUID('schema_id') schemaId: string,
    @AuthJwt() { accountId }: JwtParams,
  ) {
    const testInstance = await this.testInstanceService.get(instanceId);
    if (!testInstance) {
      throw new NotFoundException('Instance does not exist');
    }

    if (testInstance.schema.id !== schemaId) {
      throw new NotFoundException('Instance does not exist for this schema');
    }

    const teacher = await this.accountService.get(accountId, AccountType.TEACHER);
    if (!teacher) {
      throw new Error('Teacher account does not exist');
    }

    if (!teacher.isVerified) {
      throw new ForbiddenException('Teacher account is not verified');
    }

    await this.testInstanceService.remove(testInstance);
  }

  @Post(':instance_id/start')
  @HttpCode(200)
  public async start(
    @ParamUUID('instance_id') instanceId: string,
    @ParamUUID('schema_id') schemaId: string,
    @AuthJwt() { accountId }: JwtParams,
  ) {
    let testInstance = await this.testInstanceService.get(instanceId);
    if (!testInstance) {
      throw new NotFoundException('Instance does not exist');
    }

    if (testInstance.schema.id !== schemaId) {
      throw new NotFoundException('Instance does not exist for this schema');
    }

    if (!testInstance.isCreated() && !testInstance.isEnded()) {
      throw new ConflictException('Instance status must be created or ended');
    }

    const teacher = await this.accountService.get(accountId, AccountType.TEACHER);
    if (!teacher) {
      throw new Error('Teacher account does not exist');
    }

    if (!teacher.isVerified) {
      throw new ForbiddenException('Teacher account is not verified');
    }

    testInstance = await this.testInstanceService.start(testInstance);

    return new TestInstanceResponseDto(testInstance);
  }

  @Post(':instance_id/end')
  @HttpCode(200)
  public async end(
    @ParamUUID('instance_id') instanceId: string,
    @ParamUUID('schema_id') schemaId: string,
    @AuthJwt() { accountId }: JwtParams,
  ) {
    let testInstance = await this.testInstanceService.get(instanceId);
    if (!testInstance) {
      throw new NotFoundException('Instance does not exist');
    }

    if (testInstance.schema.id !== schemaId) {
      throw new NotFoundException('Instance does not exist for this schema');
    }

    if (!testInstance.isStarted()) {
      throw new ConflictException('Instance status must be started');
    }

    const teacher = await this.accountService.get(accountId, AccountType.TEACHER);
    if (!teacher) {
      throw new Error('Teacher account does not exist');
    }

    if (!teacher.isVerified) {
      throw new ForbiddenException('Teacher account is not verified');
    }

    testInstance = await this.testInstanceService.end(testInstance);

    return new TestInstanceResponseDto(testInstance);
  }
}
