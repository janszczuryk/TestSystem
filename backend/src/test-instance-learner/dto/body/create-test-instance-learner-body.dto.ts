import { IsDefined, IsInt, IsString, IsUUID, Max, Min } from 'class-validator';

export class CreateTestInstanceLearnerBodyDto {
  @IsDefined()
  @IsString()
  @IsUUID(4)
  public readonly learnerId: string;

  @IsDefined()
  @IsInt()
  @Min(1)
  @Max(1000)
  public readonly learnerNumber: number;
}
