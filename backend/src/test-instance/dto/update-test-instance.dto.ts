import { PartialType } from '@nestjs/mapped-types';

import { CreateTestInstanceDto } from './create-test-instance.dto';

export class UpdateTestInstanceDto extends PartialType(CreateTestInstanceDto) {}
