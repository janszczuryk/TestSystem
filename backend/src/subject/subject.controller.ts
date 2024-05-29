import { Body, ConflictException, Controller, Delete, Get, HttpCode, NotFoundException, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';

import { AccountType } from '@module/account/entities/account.entity';
import { AccountTypes } from '@module/auth/decorators';
import { AccountTypeGuard, JwtAuthGuard } from '@module/auth/guards';

import { CreateSubjectBodyDto } from './dto/create-subject-body.dto';
import { UpdateSubjectBodyDto } from './dto/update-subject-body.dto';
import { SubjectCreateProps } from './entities/subject.entity';
import { SubjectService, SubjectServiceUpdateDuplicateError } from './subject.service';

@Controller('subjects')
export class SubjectController {
  public constructor(private readonly subjectService: SubjectService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AccountTypeGuard)
  @AccountTypes([AccountType.TEACHER])
  public async create(@Body() body: CreateSubjectBodyDto) {
    const existingSubject = await this.subjectService.find({
      name: body.name,
      fieldOfStudy: body.fieldOfStudy,
    });
    if (existingSubject) {
      throw new ConflictException('Subject with these name and field of study already exists');
    }

    const props: SubjectCreateProps = {
      name: body.name,
      fieldOfStudy: body.fieldOfStudy,
    };

    return this.subjectService.create(props);
  }

  @Get()
  @UseGuards(JwtAuthGuard, AccountTypeGuard)
  @AccountTypes([AccountType.TEACHER])
  public async findAll() {
    return this.subjectService.findAll();
  }

  @Get(':subject_id')
  @UseGuards(JwtAuthGuard, AccountTypeGuard)
  @AccountTypes([AccountType.TEACHER])
  public async findOne(@Param('subject_id', new ParseUUIDPipe({ version: '4' })) subjectId: string) {
    const subject = await this.subjectService.get(subjectId);
    if (!subject) {
      throw new NotFoundException('Subject does not exist');
    }

    return subject;
  }

  @Patch(':subject_id')
  @UseGuards(JwtAuthGuard, AccountTypeGuard)
  @AccountTypes([AccountType.TEACHER])
  public async update(@Param('subject_id', new ParseUUIDPipe({ version: '4' })) subjectId: string, @Body() updateSubjectDto: UpdateSubjectBodyDto) {
    let subject = await this.subjectService.get(subjectId);
    if (!subject) {
      throw new NotFoundException('Subject does not exist');
    }

    try {
      subject = await this.subjectService.update(subject, updateSubjectDto);
    } catch (error) {
      if (error instanceof SubjectServiceUpdateDuplicateError) {
        throw new ConflictException(error.message);
      }

      throw error;
    }

    return subject;
  }

  @Delete(':subject_id')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard, AccountTypeGuard)
  @AccountTypes([AccountType.TEACHER])
  public async remove(@Param('subject_id', new ParseUUIDPipe({ version: '4' })) subjectId: string) {
    const subject = await this.subjectService.get(subjectId);
    if (!subject) {
      throw new NotFoundException('Subject does not exist');
    }

    await this.subjectService.remove(subject);
  }
}
