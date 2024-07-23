import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateOnQuotationModel1721742042225 implements MigrationInterface {
  name = 'UpdateOnQuotationModel1721742042225';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "quotations" ADD "reference" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "quotations" DROP COLUMN "status"`);
    await queryRunner.query(
      `CREATE TYPE "public"."quotations_status_enum" AS ENUM('REQUESTED', 'CHECKED', 'APPROVED')`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotations" ADD "status" "public"."quotations_status_enum" NOT NULL DEFAULT 'REQUESTED'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "quotations" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."quotations_status_enum"`);
    await queryRunner.query(
      `ALTER TABLE "quotations" ADD "status" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "quotations" DROP COLUMN "reference"`);
  }
}
