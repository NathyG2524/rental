import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOnAccountReceivableDetail1727267768717 implements MigrationInterface {
    name = 'UpdateOnAccountReceivableDetail1727267768717'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account_receivable_details" DROP CONSTRAINT "FK_5cb19cc7da9238f1c6b2e789036"`);
        await queryRunner.query(`ALTER TABLE "account_receivable_details" DROP COLUMN "unit"`);
        await queryRunner.query(`ALTER TABLE "account_receivable_details" DROP COLUMN "projectId"`);
        await queryRunner.query(`ALTER TABLE "account_receivable_details" DROP COLUMN "days"`);
        await queryRunner.query(`ALTER TABLE "account_receivable_details" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "account_receivable_details" ADD "dueDate" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account_receivable_details" DROP COLUMN "dueDate"`);
        await queryRunner.query(`ALTER TABLE "account_receivable_details" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "account_receivable_details" ADD "days" numeric`);
        await queryRunner.query(`ALTER TABLE "account_receivable_details" ADD "projectId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "account_receivable_details" ADD "unit" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "account_receivable_details" ADD CONSTRAINT "FK_5cb19cc7da9238f1c6b2e789036" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
