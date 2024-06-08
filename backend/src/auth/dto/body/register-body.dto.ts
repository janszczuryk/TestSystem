import { IsDefined, IsEmail, IsEnum, IsIn, IsString, Length, MaxLength } from 'class-validator';

import { AccountType } from '@module/account/entities/account.entity';

export class RegisterBodyDto {
  @IsDefined()
  @IsString()
  @MaxLength(250)
  @IsEmail()
  public readonly email: string;

  @IsDefined()
  @IsString()
  @Length(8, 250)
  public readonly password: string;

  @IsDefined()
  @IsString()
  @IsEnum(AccountType)
  @IsIn([AccountType.LEARNER])
  public readonly type: AccountType;
}
