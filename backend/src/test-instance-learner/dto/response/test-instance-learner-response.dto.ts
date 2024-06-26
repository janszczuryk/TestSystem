import { LearnerAccountResponseDto } from '@module/account/dto/response';
import { ResponseEntityOrId } from '@module/common/types';
import { TestInstanceResponseDto } from '@module/test-instance/dto/response';
import { ResultSummaryDto } from '@module/test-instance-learner/dto/result-summary.dto';
import { TestInstanceLearner } from '@module/test-instance-learner/entities/test-instance-learner.entity';
import { TestInstanceLearnerAnswerResponseDto } from '@module/test-instance-learner-answer/dto/response';

import { ResultSummaryResponseDto } from './result-summary-response.dto';

export class TestInstanceLearnerResponseDto {
  public instanceId: string;
  public learnerId: string;
  public instance: TestInstanceResponseDto | null;
  public learner: LearnerAccountResponseDto | null;
  public learnerNumber: number;
  public answers: ResponseEntityOrId<TestInstanceLearnerAnswerResponseDto>[];
  public resultSummary: ResultSummaryResponseDto | null;
  public status: string;
  public startedAt: Date | null;
  public finishedAt: Date | null;
  public updatedAt: Date;
  public createdAt: Date;

  public constructor(testInstanceLearner: TestInstanceLearner & { resultSummary?: ResultSummaryDto }) {
    this.instanceId = testInstanceLearner.instanceId;
    this.learnerId = testInstanceLearner.learnerId;
    this.instance = testInstanceLearner.instance?.id ? new TestInstanceResponseDto(testInstanceLearner.instance) : null;
    this.learner = testInstanceLearner.learner?.id ? new LearnerAccountResponseDto(testInstanceLearner.learner) : null;
    this.learnerNumber = testInstanceLearner.learnerNumber;
    this.answers =
      testInstanceLearner.answers?.map((testInstanceLearnerAnswer) =>
        testInstanceLearnerAnswer?.id
          ? new TestInstanceLearnerAnswerResponseDto(testInstanceLearnerAnswer)
          : { id: String(testInstanceLearnerAnswer) },
      ) ?? null;
    this.resultSummary = testInstanceLearner.resultSummary
      ? new ResultSummaryResponseDto(testInstanceLearner.resultSummary)
      : null;
    this.status = testInstanceLearner.status;
    this.startedAt = testInstanceLearner.startedAt ?? null;
    this.finishedAt = testInstanceLearner.finishedAt ?? null;
    this.updatedAt = testInstanceLearner.updatedAt;
    this.createdAt = testInstanceLearner.createdAt;
  }
}
