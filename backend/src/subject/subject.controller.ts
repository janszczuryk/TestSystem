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

import { CreateSubjectBodyDto, UpdateSubjectBodyDto } from './dto/body';
import { SubjectResponseDto } from './dto/response';
import { Subject } from './entities/subject.entity';
import { SubjectService, SubjectServiceUpdateDuplicateError } from './subject.service';

@Controller('subjects')
@UseGuards(JwtAuthGuard, AccountTypeGuard)
@AccountTypes([AccountType.TEACHER])
export class SubjectController {
  public constructor(private readonly subjectService: SubjectService) {}

  @Post()
  public async create(@Body() body: CreateSubjectBodyDto) {
    const existingSubject = await this.subjectService.find({
      name: body.name,
      fieldOfStudy: body.fieldOfStudy,
    });
    if (existingSubject) {
      throw new ConflictException('Subject with these name and field of study already exists');
    }

    let subject = Subject.create({
      name: body.name,
      fieldOfStudy: body.fieldOfStudy,
    });
    subject = await this.subjectService.create(subject);

    return new SubjectResponseDto(subject);
  }

  @Get()
  public async findAll() {
    const subjects = await this.subjectService.findAll();

    return subjects.map((subject) => new SubjectResponseDto(subject));
  }

  @Get(':subject_id')
  public async findOne(@ParamUUID('subject_id') subjectId: string) {
    const subject = await this.subjectService.get(subjectId);
    if (!subject) {
      throw new NotFoundException('Subject does not exist');
    }

    return new SubjectResponseDto(subject);
  }

  @Patch(':subject_id')
  public async update(@ParamUUID('subject_id') subjectId: string, @Body() body: UpdateSubjectBodyDto) {
    let subject = await this.subjectService.get(subjectId);
    if (!subject) {
      throw new NotFoundException('Subject does not exist');
    }

    try {
      subject = await this.subjectService.update(subject, body);
    } catch (error) {
      if (error instanceof SubjectServiceUpdateDuplicateError) {
        throw new ConflictException(error.message);
      }

      throw error;
    }

    return new SubjectResponseDto(subject);
  }

  @Delete(':subject_id')
  @HttpCode(204)
  public async remove(@ParamUUID('subject_id') subjectId: string) {
    const subject = await this.subjectService.get(subjectId);
    if (!subject) {
      throw new NotFoundException('Subject does not exist');
    }

    // TODO: Handle cascade
    await this.subjectService.remove(subject);
  }
}
