import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { Subject, SubjectUpdateProps } from './entities/subject.entity';

export class SubjectServiceError extends Error {}

export class SubjectServiceCreateError extends SubjectServiceError {}

export class SubjectServiceCreateDuplicateError extends SubjectServiceCreateError {}

export class SubjectServiceUpdateError extends SubjectServiceError {}

export class SubjectServiceUpdateDuplicateError extends SubjectServiceUpdateError {}

@Injectable()
export class SubjectService {
  public constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  public async create(subject: Subject): Promise<Subject> {
    const existingSubject = await this.subjectRepository.findOneBy({
      name: subject.name,
      fieldOfStudy: subject.fieldOfStudy,
    });
    if (existingSubject) {
      throw new SubjectServiceCreateDuplicateError('Subject with these name and field of study already exists');
    }

    return this.subjectRepository.save(subject);
  }

  public async findAll(): Promise<Subject[]> {
    return this.subjectRepository.find({
      loadRelationIds: true,
    });
  }

  public async find(findOptions: FindOptionsWhere<Subject>): Promise<Subject | null> {
    return this.subjectRepository.findOne({
      where: findOptions,
      relations: { testSchemas: true },
    });
  }

  public async get(id: string): Promise<Subject | null> {
    return this.subjectRepository.findOne({
      where: { id },
      relations: { testSchemas: true },
    });
  }

  public async update(subject: Subject, props: SubjectUpdateProps): Promise<Subject> {
    const existingSubject = await this.subjectRepository.findOneBy({
      name: props.name || subject.name,
      fieldOfStudy: props.fieldOfStudy || subject.fieldOfStudy,
    });
    if (existingSubject && existingSubject.id !== subject.id) {
      throw new SubjectServiceUpdateDuplicateError('Subject with these name and field of study already exists');
    }

    subject.update(props);

    return this.subjectRepository.save(subject);
  }

  public async remove(subject: Subject): Promise<void> {
    await this.subjectRepository.remove(subject);
  }
}
