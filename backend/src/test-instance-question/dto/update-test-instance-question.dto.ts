import { PartialType } from '@nestjs/mapped-types';
import { CreateTestInstanceQuestionDto } from './create-test-instance-question.dto';

export class UpdateTestInstanceQuestionDto extends PartialType(CreateTestInstanceQuestionDto) {}
