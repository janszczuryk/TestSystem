export class ResultSummaryDto {
  public readonly pointsToAchieve: number;
  public readonly pointsAchieved: number;
  public readonly percentage: number;

  public constructor(props: Pick<ResultSummaryDto, 'pointsToAchieve' | 'pointsAchieved' | 'percentage'>) {
    this.pointsToAchieve = props.pointsAchieved;
    this.pointsAchieved = props.pointsAchieved;
    this.percentage = props.percentage;
  }
}
