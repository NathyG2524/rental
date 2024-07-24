import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateOnQuotationStatusEnum1721804616931
  implements MigrationInterface
{
  name = 'UpdateOnQuotationStatusEnum1721804616931';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."quotations_status_enum" RENAME TO "quotations_status_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."quotations_status_enum" AS ENUM('DRAFT', 'REQUESTED', 'CHECKED', 'APPROVED', 'CONVERTED')`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotations" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotations" ALTER COLUMN "status" TYPE "public"."quotations_status_enum" USING "status"::"text"::"public"."quotations_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotations" ALTER COLUMN "status" SET DEFAULT 'DRAFT'`,
    );
    await queryRunner.query(`DROP TYPE "public"."quotations_status_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."quotations_status_enum_old" AS ENUM('REQUESTED', 'CHECKED', 'APPROVED', 'CONVERTED')`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotations" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotations" ALTER COLUMN "status" TYPE "public"."quotations_status_enum_old" USING "status"::"text"::"public"."quotations_status_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotations" ALTER COLUMN "status" SET DEFAULT 'REQUESTED'`,
    );
    await queryRunner.query(`DROP TYPE "public"."quotations_status_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."quotations_status_enum_old" RENAME TO "quotations_status_enum"`,
    );
  }
}
