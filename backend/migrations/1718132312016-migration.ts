import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1718132312016 implements MigrationInterface {
    name = 'Migration1718132312016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."account_type_enum" AS ENUM('learner', 'teacher')`);
        await queryRunner.query(`CREATE TABLE "account" ("id" character varying(36) NOT NULL, "email" character varying(250) NOT NULL, "password" character varying(72) NOT NULL, "is_verified" boolean NOT NULL, "type" "public"."account_type_enum" NOT NULL, "updated_at" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL, CONSTRAINT "UQ_4c8f96ccf523e9a3faefd5bdd4c" UNIQUE ("email"), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3c76f178c5065d1ab304b5832e" ON "account" ("type") `);
        await queryRunner.query(`CREATE TYPE "public"."test_instance_learner_answer_status_enum" AS ENUM('created', 'shown', 'correct_answer_submitted', 'incorrect_answer_submitted')`);
        await queryRunner.query(`CREATE TABLE "test_instance_learner_answer" ("id" character varying(36) NOT NULL, "instance_learner_instance_id" character varying(36) NOT NULL, "instance_learner_learner_id" character varying(36) NOT NULL, "status" "public"."test_instance_learner_answer_status_enum" NOT NULL, "submitted_answer_index" integer, "shown_at" TIMESTAMP, "answer_submitted_at" TIMESTAMP, "updated_at" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL, "instance_question_id" character varying(36), CONSTRAINT "PK_b816c3953b21a98ea37ad08dba0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."test_instance_learner_status_enum" AS ENUM('joined', 'started', 'finished')`);
        await queryRunner.query(`CREATE TABLE "test_instance_learner" ("instance_id" character varying(36) NOT NULL, "learner_id" character varying(36) NOT NULL, "learner_number" integer NOT NULL, "status" "public"."test_instance_learner_status_enum" NOT NULL, "started_at" TIMESTAMP, "finished_at" TIMESTAMP, "updated_at" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL, CONSTRAINT "UQ_459b3eb2d72724d5d3d541153d6" UNIQUE ("instance_id", "learner_number"), CONSTRAINT "PK_adc0e184ca319d61d5d163d23c0" PRIMARY KEY ("instance_id", "learner_id"))`);
        await queryRunner.query(`CREATE TABLE "subject" ("id" character varying(36) NOT NULL, "name" character varying(250) NOT NULL, "field_of_study" character varying(50) NOT NULL, "updated_at" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL, CONSTRAINT "UQ_fbd6db36ec53c96e2e6c6cf936a" UNIQUE ("name", "field_of_study"), CONSTRAINT "PK_12eee115462e38d62e5455fc054" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "test_schema" ("id" character varying(36) NOT NULL, "name" character varying(250) NOT NULL, "updated_at" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL, "subject_id" character varying(36), CONSTRAINT "UQ_b0b2255196e0232e0343b703df6" UNIQUE ("name"), CONSTRAINT "PK_81c30a9af6f0e64e39b428478da" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."test_instance_status_enum" AS ENUM('created', 'started', 'ended')`);
        await queryRunner.query(`CREATE TABLE "test_instance" ("id" character varying(36) NOT NULL, "questions_count" integer NOT NULL, "is_enabled" boolean NOT NULL, "status" "public"."test_instance_status_enum" NOT NULL, "started_at" TIMESTAMP, "ended_at" TIMESTAMP, "updated_at" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL, "schema_id" character varying(36), "teacher_id" character varying(36), CONSTRAINT "PK_43ac19e1bd2750b8e32db9e838a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "test_instance_question" ("id" character varying(36) NOT NULL, "question" character varying(250) NOT NULL, "answers" character varying array NOT NULL, "correct_answer_index" integer NOT NULL, "updated_at" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL, "schema_question_id" character varying(36), "instance_id" character varying(36), CONSTRAINT "PK_e99e305448fc2a208c5f7a6633e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "test_schema_question" ("id" character varying(36) NOT NULL, "question" character varying(250) NOT NULL, "answers" character varying array NOT NULL, "correct_answer_index" integer NOT NULL, "updated_at" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL, "schema_id" character varying(36), CONSTRAINT "PK_a088610c9f1f9ba8c67b55913aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "test_instance_learner_answer" ADD CONSTRAINT "FK_b55260ae146eb558e8c5afc545c" FOREIGN KEY ("instance_learner_instance_id", "instance_learner_learner_id") REFERENCES "test_instance_learner"("instance_id","learner_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "test_instance_learner_answer" ADD CONSTRAINT "FK_690ef36fc545028937f0df6d51c" FOREIGN KEY ("instance_question_id") REFERENCES "test_instance_question"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "test_instance_learner" ADD CONSTRAINT "FK_48dd5c0daa35eaa67ebcc7509aa" FOREIGN KEY ("instance_id") REFERENCES "test_instance"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "test_instance_learner" ADD CONSTRAINT "FK_e9b4f5fdae74836cfe6e58342ed" FOREIGN KEY ("learner_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "test_schema" ADD CONSTRAINT "FK_aa57982f09928b366b872b5b722" FOREIGN KEY ("subject_id") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "test_instance" ADD CONSTRAINT "FK_0ae84da977d220acee276481834" FOREIGN KEY ("schema_id") REFERENCES "test_schema"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "test_instance" ADD CONSTRAINT "FK_7f7baca170f115c8dbe39dfcd4d" FOREIGN KEY ("teacher_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "test_instance_question" ADD CONSTRAINT "FK_93c5d5e70566f765a6ba7cc7b37" FOREIGN KEY ("schema_question_id") REFERENCES "test_schema_question"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "test_instance_question" ADD CONSTRAINT "FK_080f2330839eb2c5738dcfa24da" FOREIGN KEY ("instance_id") REFERENCES "test_instance"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "test_schema_question" ADD CONSTRAINT "FK_35b99b4cfbe45213893eee66dbf" FOREIGN KEY ("schema_id") REFERENCES "test_schema"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test_schema_question" DROP CONSTRAINT "FK_35b99b4cfbe45213893eee66dbf"`);
        await queryRunner.query(`ALTER TABLE "test_instance_question" DROP CONSTRAINT "FK_080f2330839eb2c5738dcfa24da"`);
        await queryRunner.query(`ALTER TABLE "test_instance_question" DROP CONSTRAINT "FK_93c5d5e70566f765a6ba7cc7b37"`);
        await queryRunner.query(`ALTER TABLE "test_instance" DROP CONSTRAINT "FK_7f7baca170f115c8dbe39dfcd4d"`);
        await queryRunner.query(`ALTER TABLE "test_instance" DROP CONSTRAINT "FK_0ae84da977d220acee276481834"`);
        await queryRunner.query(`ALTER TABLE "test_schema" DROP CONSTRAINT "FK_aa57982f09928b366b872b5b722"`);
        await queryRunner.query(`ALTER TABLE "test_instance_learner" DROP CONSTRAINT "FK_e9b4f5fdae74836cfe6e58342ed"`);
        await queryRunner.query(`ALTER TABLE "test_instance_learner" DROP CONSTRAINT "FK_48dd5c0daa35eaa67ebcc7509aa"`);
        await queryRunner.query(`ALTER TABLE "test_instance_learner_answer" DROP CONSTRAINT "FK_690ef36fc545028937f0df6d51c"`);
        await queryRunner.query(`ALTER TABLE "test_instance_learner_answer" DROP CONSTRAINT "FK_b55260ae146eb558e8c5afc545c"`);
        await queryRunner.query(`DROP TABLE "test_schema_question"`);
        await queryRunner.query(`DROP TABLE "test_instance_question"`);
        await queryRunner.query(`DROP TABLE "test_instance"`);
        await queryRunner.query(`DROP TYPE "public"."test_instance_status_enum"`);
        await queryRunner.query(`DROP TABLE "test_schema"`);
        await queryRunner.query(`DROP TABLE "subject"`);
        await queryRunner.query(`DROP TABLE "test_instance_learner"`);
        await queryRunner.query(`DROP TYPE "public"."test_instance_learner_status_enum"`);
        await queryRunner.query(`DROP TABLE "test_instance_learner_answer"`);
        await queryRunner.query(`DROP TYPE "public"."test_instance_learner_answer_status_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3c76f178c5065d1ab304b5832e"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TYPE "public"."account_type_enum"`);
    }

}
