import { LearnerAccount } from '@module/account/entities/learner-account.entity';

import { AccountResponseDto } from './account-response.dto';

export class LearnerAccountResponseDto extends AccountResponseDto {
  public constructor(learnerAccount: LearnerAccount) {
    super(learnerAccount);
  }
}
