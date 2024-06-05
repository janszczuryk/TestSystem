import { IsDefined, IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateTestSchemaBodyDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  public readonly name: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsUUID(4)
  public readonly subjectId: string;
}
