import { TeacherAccount } from '@module/account/entities/teacher-account.entity';

import { AccountResponseDto } from './account-response.dto';

export class TeacherAccountResponseDto extends AccountResponseDto {
  public constructor(teacherAccount: TeacherAccount) {
    super(teacherAccount);
  }
}
