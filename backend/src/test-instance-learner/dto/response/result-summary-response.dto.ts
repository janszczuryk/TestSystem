import { ResultSummaryDto } from '@module/test-instance-learner/dto/result-summary.dto';

export class ResultSummaryResponseDto {
  public pointsToAchieve: number;
  public pointsAchieved: number;
  public percentage: number;

  public constructor(resultsSummary: ResultSummaryDto) {
    this.pointsToAchieve = resultsSummary.pointsToAchieve;
    this.pointsAchieved = resultsSummary.pointsAchieved;
    this.percentage = resultsSummary.percentage;
  }
}
