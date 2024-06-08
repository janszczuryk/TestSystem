import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class UpdateTestSchemaBodyDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  public readonly name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsUUID(4)
  public readonly subjectId: string;
}
