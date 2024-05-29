import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateSubjectBodyDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  public readonly name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  public readonly fieldOfStudy?: string;
}
