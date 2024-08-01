import { MigrationInterface, QueryRunner } from 'typeorm';

export class DaysAddedOnItems1722512180637 implements MigrationInterface {
  name = 'DaysAddedOnItems1722512180637';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "quotation_items" ADD "days" numeric`);
    await queryRunner.query(
      `ALTER TABLE "account_payable_details" ADD "days" numeric`,
    );
    await queryRunner.query(`ALTER TABLE "invoice_items" ADD "days" numeric`);
    await queryRunner.query(
      `ALTER TABLE "account_receivable_details" ADD "days" numeric`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account_receivable_details" DROP COLUMN "days"`,
    );
    await queryRunner.query(`ALTER TABLE "invoice_items" DROP COLUMN "days"`);
    await queryRunner.query(
      `ALTER TABLE "account_payable_details" DROP COLUMN "days"`,
    );
    await queryRunner.query(`ALTER TABLE "quotation_items" DROP COLUMN "days"`);
  }
}
