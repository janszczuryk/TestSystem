import { IsBoolean, IsInt, IsOptional, Max, Min } from 'class-validator';

export class UpdateTestInstanceBodyDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  public readonly questionsCount: number;

  @IsOptional()
  @IsBoolean()
  public readonly isEnabled: boolean;
}
