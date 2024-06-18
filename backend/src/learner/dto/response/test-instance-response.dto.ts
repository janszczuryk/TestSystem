import { TeacherAccount } from '@module/account/entities/teacher-account.entity';
import { Subject } from '@module/subject/entities/subject.entity';
import { TestInstance } from '@module/test-instance/entities/test-instance.entity';
import { TestInstanceLearner } from '@module/test-instance-learner/entities/test-instance-learner.entity';
import { TestSchema } from '@module/test-schema/entities/test-schema.entity';

import { TestInstanceLearnerResponseDto } from './test-instance-learner-response.dto';

export class TestInstanceResponseDto {
  public id: string;
  public questionsCount: number;
  public isEnabled: boolean;
  public status: string;
  public schema: SchemaResponseDto;
  public subject: SubjectResponseDto;
  public learner: TestInstanceLearnerResponseDto | null;
  public teacher: TeacherResponseDto;
  public startedAt: Date | null;
  public endedAt: Date | null;
  public updatedAt: Date;
  public createdAt: Date;

  public constructor(testInstance: TestInstance & { learner?: TestInstanceLearner }) {
    this.id = testInstance.id;
    this.questionsCount = testInstance.questionsCount;
    this.isEnabled = testInstance.isEnabled;
    this.status = testInstance.status;
    this.schema = new SchemaResponseDto(testInstance.schema!);
    this.subject = new SubjectResponseDto(testInstance.schema!.subject);
    this.learner = testInstance.learner ? new TestInstanceLearnerResponseDto(testInstance.learner) : null;
    this.teacher = new TeacherResponseDto(testInstance.teacher);
    this.startedAt = testInstance.startedAt ?? null;
    this.endedAt = testInstance.endedAt ?? null;
    this.updatedAt = testInstance.updatedAt;
    this.createdAt = testInstance.createdAt;
  }
}

class SchemaResponseDto {
  public id: string;
  public name: string;

  public constructor(testSchema: TestSchema) {
    this.id = testSchema.id;
    this.name = testSchema.name;
  }
}

class SubjectResponseDto {
  public id: string;
  public name: string;
  public fieldOfStudy: string;

  public constructor(subject: Subject) {
    this.id = subject.id;
    this.name = subject.name;
    this.fieldOfStudy = subject.fieldOfStudy;
  }
}

class TeacherResponseDto {
  public id: string;
  public email: string;
  public isVerified: boolean;

  public constructor(teacherAccount: TeacherAccount) {
    this.id = teacherAccount.id;
    this.email = teacherAccount.email;
    this.isVerified = teacherAccount.isVerified;
  }
}
