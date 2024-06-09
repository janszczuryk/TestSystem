import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TestInstanceQuestion } from './entities/test-instance-question.entity';

@Injectable()
export class TestInstanceQuestionService {
  public constructor(
    @InjectRepository(TestInstanceQuestion)
    private readonly testInstanceQuestionRepository: Repository<TestInstanceQuestion>,
  ) {}

  public async create(testInstanceQuestion: TestInstanceQuestion): Promise<TestInstanceQuestion> {
    return this.testInstanceQuestionRepository.save(testInstanceQuestion);
  }

  public async createMany(testInstanceQuestions: TestInstanceQuestion[]): Promise<TestInstanceQuestion[]> {
    return this.testInstanceQuestionRepository.save(testInstanceQuestions);
  }

  public async remove(testInstanceQuestion: TestInstanceQuestion): Promise<void> {
    await this.testInstanceQuestionRepository.remove(testInstanceQuestion);
  }

  public async removeMany(testInstanceQuestions: TestInstanceQuestion[]): Promise<void> {
    await this.testInstanceQuestionRepository.remove(testInstanceQuestions);
  }
}
