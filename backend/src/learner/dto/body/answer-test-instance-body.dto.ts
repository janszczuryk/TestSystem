import { IsDefined, IsInt, Max, Min } from 'class-validator';

export class AnswerTestInstanceBodyDto {
  @IsDefined()
  @IsInt()
  @Min(0)
  @Max(19)
  public answerIndex: number;
}
