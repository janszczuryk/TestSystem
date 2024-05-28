import { PartialType } from '@nestjs/mapped-types';

import { CreateTestSchemaQuestionDto } from './create-test-schema-question.dto';

export class UpdateTestSchemaQuestionDto extends PartialType(CreateTestSchemaQuestionDto) {}
