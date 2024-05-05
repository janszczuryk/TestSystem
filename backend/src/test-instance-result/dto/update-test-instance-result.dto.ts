import { PartialType } from '@nestjs/mapped-types';
import { CreateTestInstanceResultDto } from './create-test-instance-result.dto';

export class UpdateTestInstanceResultDto extends PartialType(CreateTestInstanceResultDto) {}
