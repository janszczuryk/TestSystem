import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateTestSchemaQuestionBodyDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  public readonly question: string;

  @IsDefined()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(20)
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @MaxLength(250, { each: true })
  public readonly answers: string[];

  @IsDefined()
  @IsInt()
  @Min(0)
  @Max(19)
  public readonly correctAnswerIndex: number;
}
