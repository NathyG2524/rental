import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateOnQuotationStatus1721754987769
  implements MigrationInterface
{
  name = 'UpdateOnQuotationStatus1721754987769';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."quotations_status_enum" RENAME TO "quotations_status_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."quotations_status_enum" AS ENUM('REQUESTED', 'CHECKED', 'APPROVED', 'CONVERTED')`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotations" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotations" ALTER COLUMN "status" TYPE "public"."quotations_status_enum" USING "status"::"text"::"public"."quotations_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotations" ALTER COLUMN "status" SET DEFAULT 'REQUESTED'`,
    );
    await queryRunner.query(`DROP TYPE "public"."quotations_status_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."quotations_status_enum_old" AS ENUM('REQUESTED', 'CHECKED', 'APPROVED')`,
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
