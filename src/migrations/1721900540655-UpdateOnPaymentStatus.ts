import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateOnPaymentStatus1721900540655 implements MigrationInterface {
  name = 'UpdateOnPaymentStatus1721900540655';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."invoices_status_enum" RENAME TO "invoices_status_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."invoices_status_enum" AS ENUM('NOT_PAID', 'PAID', 'PROCESSING')`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoices" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoices" ALTER COLUMN "status" TYPE "public"."invoices_status_enum" USING "status"::"text"::"public"."invoices_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoices" ALTER COLUMN "status" SET DEFAULT 'NOT_PAID'`,
    );
    await queryRunner.query(`DROP TYPE "public"."invoices_status_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."invoices_status_enum_old" AS ENUM('NOT_PAID', 'PAID')`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoices" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoices" ALTER COLUMN "status" TYPE "public"."invoices_status_enum_old" USING "status"::"text"::"public"."invoices_status_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoices" ALTER COLUMN "status" SET DEFAULT 'NOT_PAID'`,
    );
    await queryRunner.query(`DROP TYPE "public"."invoices_status_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."invoices_status_enum_old" RENAME TO "invoices_status_enum"`,
    );
  }
}
