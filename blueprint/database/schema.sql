CREATE TYPE "account_type" AS ENUM (
  'teacher',
  'learner'
);

CREATE TYPE "test_instance_status" AS ENUM (
  'created',
  'started',
  'ended'
);

CREATE TYPE "test_instance_result_status" AS ENUM (
  'created',
  'correctly_answered',
  'incorrectly_answered'
);

CREATE TABLE "accounts" (
  "id" uuid PRIMARY KEY,
  "login" varchar UNIQUE,
  "password" varchar,
  "verified" boolean,
  "type" account_type,
  "created_at" timestampz,
  "updated_at" timestampz
);

CREATE TABLE "teachers" (
  "id" uuid PRIMARY KEY,
  "account_id" uuid,
  "created_at" timestampz,
  "updated_at" timestampz
);

CREATE TABLE "learners" (
  "id" uuid PRIMARY KEY,
  "account_id" uuid,
  "created_at" timestampz,
  "updated_at" timestampz
);

CREATE TABLE "subjects" (
  "id" uuid PRIMARY KEY,
  "name" varchar,
  "field_of_study_designation" varchar,
  "created_at" timestampz,
  "updated_at" timestampz
);

CREATE TABLE "tests" (
  "id" uuid PRIMARY KEY,
  "name" varchar,
  "subject_id" uuid,
  "teacher_id" uuid,
  "created_at" timestampz,
  "updated_at" timestampz
);

CREATE TABLE "test_questions" (
  "id" uuid PRIMARY KEY,
  "question" text,
  "answer_list" jsonb,
  "correct_answer_index" integer,
  "test_id" uuid,
  "created_at" timestampz,
  "updated_at" timestampz
);

CREATE TABLE "test_instances" (
  "id" uuid PRIMARY KEY,
  "accessible" boolean,
  "status" test_instance_status,
  "test_id" uuid,
  "test_question_id" uuid,
  "teacher_id" uuid,
  "started_at" timestampz,
  "ended_at" timestampz,
  "created_at" timestampz,
  "updated_at" timestampz
);

CREATE TABLE "test_instance_results" (
  "id" uuid PRIMARY KEY,
  "status" test_instance_result_status,
  "learner_number" integer,
  "question" text,
  "answer_list" jsonb,
  "correct_answer_index" integer,
  "submitted_answer_index" integer,
  "learner_id" uuid,
  "test_instance_id" uuid,
  "test_question_id" uuid,
  "submitted_at" timestampz,
  "created_at" timestampz,
  "updated_at" timestampz
);

CREATE UNIQUE INDEX ON "subjects" ("name", "field_of_study_designation");

CREATE UNIQUE INDEX ON "tests" ("name", "subject_id");

CREATE UNIQUE INDEX ON "test_instance_results" ("learner_number", "learner_id");

ALTER TABLE "teachers" ADD FOREIGN KEY ("account_id") REFERENCES "accounts" ("id");

ALTER TABLE "learners" ADD FOREIGN KEY ("account_id") REFERENCES "accounts" ("id");

ALTER TABLE "tests" ADD FOREIGN KEY ("subject_id") REFERENCES "subjects" ("id");

ALTER TABLE "tests" ADD FOREIGN KEY ("teacher_id") REFERENCES "teachers" ("id");

ALTER TABLE "test_questions" ADD FOREIGN KEY ("test_id") REFERENCES "tests" ("id");

ALTER TABLE "test_instances" ADD FOREIGN KEY ("test_id") REFERENCES "tests" ("id");

CREATE TABLE "test_instances_test_questions" (
  "test_instances_test_question_id" uuid,
  "test_questions_id" uuid,
  PRIMARY KEY ("test_instances_test_question_id", "test_questions_id")
);

ALTER TABLE "test_instances_test_questions" ADD FOREIGN KEY ("test_instances_test_question_id") REFERENCES "test_instances" ("test_question_id");

ALTER TABLE "test_instances_test_questions" ADD FOREIGN KEY ("test_questions_id") REFERENCES "test_questions" ("id");


ALTER TABLE "test_instances" ADD FOREIGN KEY ("teacher_id") REFERENCES "teachers" ("id");

ALTER TABLE "test_instance_results" ADD FOREIGN KEY ("learner_id") REFERENCES "learners" ("id");

ALTER TABLE "test_instance_results" ADD FOREIGN KEY ("test_instance_id") REFERENCES "test_instances" ("id");

ALTER TABLE "test_instance_results" ADD FOREIGN KEY ("test_question_id") REFERENCES "test_questions" ("id");
