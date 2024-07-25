import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateOnPaymentAccountReceivable1721887008728
  implements MigrationInterface
{
  name = 'UpdateOnPaymentAccountReceivable1721887008728';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD "reference" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_receivables" ADD "reference" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "invoices" DROP COLUMN "status"`);
    await queryRunner.query(
      `CREATE TYPE "public"."invoices_status_enum" AS ENUM('NOT_PAID', 'PAID')`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD "status" "public"."invoices_status_enum" NOT NULL DEFAULT 'NOT_PAID'`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_receivables" DROP COLUMN "status"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."account_receivables_status_enum" AS ENUM('NOT_RECEIVED', 'RECEIVED')`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_receivables" ADD "status" "public"."account_receivables_status_enum" NOT NULL DEFAULT 'NOT_RECEIVED'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account_receivables" DROP COLUMN "status"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."account_receivables_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_receivables" ADD "status" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "invoices" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."invoices_status_enum"`);
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD "status" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_receivables" DROP COLUMN "reference"`,
    );
    await queryRunner.query(`ALTER TABLE "invoices" DROP COLUMN "reference"`);
  }
}
