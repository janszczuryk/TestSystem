import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { randomUUID } from 'crypto';

import { Subject, SubjectCreateProps, SubjectUpdateProps } from './entities/subject.entity';

export class SubjectServiceError extends Error {}

export class SubjectServiceUpdateError extends Error {}

export class SubjectServiceUpdateDuplicateError extends Error {}

@Injectable()
export class SubjectService {
  public constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  public async create(props: SubjectCreateProps): Promise<Subject> {
    const now = new Date();

    const subject = this.subjectRepository.create({
      id: randomUUID(),
      ...props,
      testSchemas: [],
      updatedAt: now,
      createdAt: now,
    });

    return this.subjectRepository.save(subject);
  }

  public async findAll(): Promise<Subject[]> {
    return this.subjectRepository.find();
  }

  public async find(findOptions: FindOptionsWhere<Subject>): Promise<Subject | null> {
    return this.subjectRepository.findOneBy(findOptions);
  }

  public async get(id: string): Promise<Subject | null> {
    return this.subjectRepository.findOneBy({ id });
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
