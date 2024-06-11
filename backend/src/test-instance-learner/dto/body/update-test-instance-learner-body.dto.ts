import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class UpdateTestInstanceLearnerBodyDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(1000)
  public readonly learnerNumber: number;
}
