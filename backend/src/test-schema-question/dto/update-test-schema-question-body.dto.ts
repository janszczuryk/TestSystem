import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdateTestSchemaQuestionBodyDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  public readonly question: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(20)
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @MaxLength(250, { each: true })
  public readonly answers: string[];

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(19)
  public readonly correctAnswerIndex: number;
}
