import { PartialType } from '@nestjs/mapped-types';
import { CreateTestSchemaDto } from './create-test-schema.dto';

export class UpdateTestSchemaDto extends PartialType(CreateTestSchemaDto) {}
