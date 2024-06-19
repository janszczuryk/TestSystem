import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1718792459701 implements MigrationInterface {
    name = 'Migration1718792459701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test_instance_learner_answer" ADD "question_number" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "test_instance_learner_answer" ADD CONSTRAINT "UQ_c6b14a44b35a4417234769b5f42" UNIQUE ("instance_learner_instance_id", "instance_learner_learner_id", "question_number")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test_instance_learner_answer" DROP CONSTRAINT "UQ_c6b14a44b35a4417234769b5f42"`);
        await queryRunner.query(`ALTER TABLE "test_instance_learner_answer" DROP COLUMN "question_number"`);
    }

}
