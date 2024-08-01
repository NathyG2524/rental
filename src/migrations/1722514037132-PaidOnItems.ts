import { MigrationInterface, QueryRunner } from 'typeorm';

export class PaidOnItems1722514037132 implements MigrationInterface {
  name = 'PaidOnItems1722514037132';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account_receivable_details" ALTER COLUMN "paid" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account_receivable_details" ALTER COLUMN "paid" SET NOT NULL`,
    );
  }
}
