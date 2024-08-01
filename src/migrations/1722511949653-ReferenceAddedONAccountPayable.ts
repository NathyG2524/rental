import { MigrationInterface, QueryRunner } from 'typeorm';

export class ReferenceAddedONAccountPayable1722511949653
  implements MigrationInterface
{
  name = 'ReferenceAddedONAccountPayable1722511949653';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoice_items" ADD "projectId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_payables" ADD "reference" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_payable_details" ADD "projectId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_receivable_details" ADD "projectId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoice_items" ADD CONSTRAINT "FK_334f56bf9f370396c19296e9668" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_payable_details" ADD CONSTRAINT "FK_180ced47cf22b2c6bce95d01934" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_receivable_details" ADD CONSTRAINT "FK_5cb19cc7da9238f1c6b2e789036" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account_receivable_details" DROP CONSTRAINT "FK_5cb19cc7da9238f1c6b2e789036"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_payable_details" DROP CONSTRAINT "FK_180ced47cf22b2c6bce95d01934"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoice_items" DROP CONSTRAINT "FK_334f56bf9f370396c19296e9668"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_receivable_details" DROP COLUMN "projectId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_payable_details" DROP COLUMN "projectId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_payables" DROP COLUMN "reference"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoice_items" DROP COLUMN "projectId"`,
    );
  }
}
