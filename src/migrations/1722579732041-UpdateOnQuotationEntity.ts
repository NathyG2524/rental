import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateOnQuotationEntity1722579732041
  implements MigrationInterface
{
  name = 'UpdateOnQuotationEntity1722579732041';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account_receivables" ADD "invoiceId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotations" ADD "validityPeriod" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."account_receivables_status_enum" RENAME TO "account_receivables_status_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."account_receivables_status_enum" AS ENUM('NOT_RECEIVED', 'IN_PROGRESS', 'RECEIVED')`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_receivables" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_receivables" ALTER COLUMN "status" TYPE "public"."account_receivables_status_enum" USING "status"::"text"::"public"."account_receivables_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_receivables" ALTER COLUMN "status" SET DEFAULT 'NOT_RECEIVED'`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."account_receivables_status_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_payables" DROP COLUMN "status"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."account_payables_status_enum" AS ENUM('NOT_PAID', 'IN_PROGRESS', 'PAID')`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_payables" ADD "status" "public"."account_payables_status_enum" NOT NULL DEFAULT 'NOT_PAID'`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_receivables" ADD CONSTRAINT "FK_2da4906f53572df165450bbcbc9" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account_receivables" DROP CONSTRAINT "FK_2da4906f53572df165450bbcbc9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_payables" DROP COLUMN "status"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."account_payables_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_payables" ADD "status" character varying NOT NULL`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."account_receivables_status_enum_old" AS ENUM('NOT_RECEIVED', 'RECEIVED')`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_receivables" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_receivables" ALTER COLUMN "status" TYPE "public"."account_receivables_status_enum_old" USING "status"::"text"::"public"."account_receivables_status_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_receivables" ALTER COLUMN "status" SET DEFAULT 'NOT_RECEIVED'`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."account_receivables_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."account_receivables_status_enum_old" RENAME TO "account_receivables_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotations" DROP COLUMN "validityPeriod"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_receivables" DROP COLUMN "invoiceId"`,
    );
  }
}
