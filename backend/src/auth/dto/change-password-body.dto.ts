import { IsDefined, IsNotEmpty, IsString, Length } from 'class-validator';

export class ChangePasswordBodyDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  public readonly password: string;

  @IsDefined()
  @IsString()
  @Length(8, 250)
  public readonly newPassword: string;
}
