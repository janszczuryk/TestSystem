import { IsDefined, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateSubjectBodyDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  public readonly name: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  public readonly fieldOfStudy: string;
}
