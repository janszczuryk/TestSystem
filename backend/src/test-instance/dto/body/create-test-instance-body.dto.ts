import { IsBoolean, IsDefined, IsInt, Max, Min } from 'class-validator';

export class CreateTestInstanceBodyDto {
  @IsDefined()
  @IsInt()
  @Min(1)
  @Max(100)
  public readonly questionsCount: number;

  @IsDefined()
  @IsBoolean()
  public readonly isEnabled: boolean;
}
