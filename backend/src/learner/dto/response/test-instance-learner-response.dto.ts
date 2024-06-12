import { TestInstanceLearner } from '@module/test-instance-learner/entities/test-instance-learner.entity';

export class TestInstanceLearnerResponseDto {
  public id: string;
  public instanceId: string;
  public learnerId: string;
  public learnerNumber: number;
  public status: string;
  public startedAt: Date | null;
  public finishedAt: Date | null;
  public updatedAt: Date;
  public createdAt: Date;

  public constructor(testInstanceLearner: TestInstanceLearner) {
    this.instanceId = testInstanceLearner.instanceId;
    this.learnerId = testInstanceLearner.learnerId;
    this.learnerNumber = testInstanceLearner.learnerNumber;
    this.status = testInstanceLearner.status;
    this.startedAt = testInstanceLearner.startedAt ?? null;
    this.finishedAt = testInstanceLearner.finishedAt ?? null;
    this.updatedAt = testInstanceLearner.updatedAt;
    this.createdAt = testInstanceLearner.createdAt;
  }
}
