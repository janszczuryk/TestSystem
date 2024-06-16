import { AccountResponseDto } from '@module/account/dto/response';
import { Account } from '@module/account/entities/account.entity';

export class LoginResponseDto extends AccountResponseDto {
  public readonly jwtToken: string;

  public constructor(account: Account & { jwtToken: string }) {
    super(account);
    this.jwtToken = account.jwtToken;
  }
}
