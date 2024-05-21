import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1716314879682 implements MigrationInterface {
    name = 'Migration1716314879682'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subject" ("id" character varying(36) NOT NULL, "name" character varying(250) NOT NULL, "fieldOfStudy" character varying(50) NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_12eee115462e38d62e5455fc054" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."account_type_enum" AS ENUM('learner', 'teacher')`);
        await queryRunner.query(`CREATE TABLE "account" ("id" character varying(36) NOT NULL, "isVerified" boolean NOT NULL, "type" "public"."account_type_enum" NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3c76f178c5065d1ab304b5832e" ON "account" ("type") `);
        await queryRunner.query(`CREATE TABLE "test_instance_question" ("id" character varying(36) NOT NULL, "question" character varying(250) NOT NULL, "answers" character varying array NOT NULL, "correctAnswerIndex" integer NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL, "schemaQuestionId" character varying(36), "instanceId" character varying(36), CONSTRAINT "PK_e99e305448fc2a208c5f7a6633e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."test_instance_result_status_enum" AS ENUM('created', 'correctly_answered', 'incorrectly_answered')`);
        await queryRunner.query(`CREATE TABLE "test_instance_result" ("id" character varying(36) NOT NULL, "learnerNumber" integer NOT NULL, "answers" character varying array NOT NULL, "correctAnswerIndex" integer NOT NULL, "submittedAnswerIndex" integer NOT NULL, "status" "public"."test_instance_result_status_enum" NOT NULL, "submittedAt" TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL, "instanceId" character varying(36), "questionId" character varying(36), CONSTRAINT "UQ_360b1be8c58f1a6e657c5c450c8" UNIQUE ("learnerNumber"), CONSTRAINT "PK_1c986eb96f2e27e50a6fa7174b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."test_instance_status_enum" AS ENUM('created', 'started', 'ended')`);
        await queryRunner.query(`CREATE TABLE "test_instance" ("id" character varying(36) NOT NULL, "isEnabled" boolean NOT NULL, "status" "public"."test_instance_status_enum" NOT NULL, "startedAt" TIMESTAMP, "endedAt" TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL, "schemaId" character varying(36), "teacherId" character varying(36), CONSTRAINT "PK_43ac19e1bd2750b8e32db9e838a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "test_schema" ("id" character varying(36) NOT NULL, "name" character varying(250) NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL, "subjectId" character varying(36), CONSTRAINT "PK_81c30a9af6f0e64e39b428478da" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "test_schema_question" ("id" character varying(36) NOT NULL, "question" character varying(250) NOT NULL, "answers" character varying array NOT NULL, "correctAnswerIndex" integer NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL, "schemaId" character varying(36), CONSTRAINT "PK_a088610c9f1f9ba8c67b55913aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "test_instance_question" ADD CONSTRAINT "FK_64f2c754f13238050290356dda3" FOREIGN KEY ("schemaQuestionId") REFERENCES "test_schema_question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "test_instance_question" ADD CONSTRAINT "FK_26f98d7831a631b21209fa598cd" FOREIGN KEY ("instanceId") REFERENCES "test_instance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "test_instance_result" ADD CONSTRAINT "FK_40962aaa5d50567d6d12874b06c" FOREIGN KEY ("instanceId") REFERENCES "test_instance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "test_instance_result" ADD CONSTRAINT "FK_8e0f63f81ef13e12a5e6eaeda18" FOREIGN KEY ("questionId") REFERENCES "test_instance_question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "test_instance" ADD CONSTRAINT "FK_3e9227b38cb1865c33b8b205d64" FOREIGN KEY ("schemaId") REFERENCES "test_schema"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "test_instance" ADD CONSTRAINT "FK_84d4e3759e790b87a9343e2fc66" FOREIGN KEY ("teacherId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "test_schema" ADD CONSTRAINT "FK_c8017587b20a73309a4804031a0" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "test_schema_question" ADD CONSTRAINT "FK_382713e450c711c6cb0c545dd86" FOREIGN KEY ("schemaId") REFERENCES "test_schema"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test_schema_question" DROP CONSTRAINT "FK_382713e450c711c6cb0c545dd86"`);
        await queryRunner.query(`ALTER TABLE "test_schema" DROP CONSTRAINT "FK_c8017587b20a73309a4804031a0"`);
        await queryRunner.query(`ALTER TABLE "test_instance" DROP CONSTRAINT "FK_84d4e3759e790b87a9343e2fc66"`);
        await queryRunner.query(`ALTER TABLE "test_instance" DROP CONSTRAINT "FK_3e9227b38cb1865c33b8b205d64"`);
        await queryRunner.query(`ALTER TABLE "test_instance_result" DROP CONSTRAINT "FK_8e0f63f81ef13e12a5e6eaeda18"`);
        await queryRunner.query(`ALTER TABLE "test_instance_result" DROP CONSTRAINT "FK_40962aaa5d50567d6d12874b06c"`);
        await queryRunner.query(`ALTER TABLE "test_instance_question" DROP CONSTRAINT "FK_26f98d7831a631b21209fa598cd"`);
        await queryRunner.query(`ALTER TABLE "test_instance_question" DROP CONSTRAINT "FK_64f2c754f13238050290356dda3"`);
        await queryRunner.query(`DROP TABLE "test_schema_question"`);
        await queryRunner.query(`DROP TABLE "test_schema"`);
        await queryRunner.query(`DROP TABLE "test_instance"`);
        await queryRunner.query(`DROP TYPE "public"."test_instance_status_enum"`);
        await queryRunner.query(`DROP TABLE "test_instance_result"`);
        await queryRunner.query(`DROP TYPE "public"."test_instance_result_status_enum"`);
        await queryRunner.query(`DROP TABLE "test_instance_question"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3c76f178c5065d1ab304b5832e"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TYPE "public"."account_type_enum"`);
        await queryRunner.query(`DROP TABLE "subject"`);
    }

}
