import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateOnQuotationModel1721742630558 implements MigrationInterface {
  name = 'UpdateOnQuotationModel1721742630558';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "quotations" DROP CONSTRAINT "FK_5519693a608fb07e023bb7133b4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotations" DROP COLUMN "quotationCheckedBy"`,
    );
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
    await queryRunner.query(
      `ALTER TABLE "quotations" DROP COLUMN "quotationCheckedById"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotations" ADD "quotationCheckedById" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotations" ADD CONSTRAINT "FK_b5af58cbd2b9ab4daa3eb6cafd3" FOREIGN KEY ("quotationCheckedById") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "quotations" DROP CONSTRAINT "FK_b5af58cbd2b9ab4daa3eb6cafd3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotations" DROP COLUMN "quotationCheckedById"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotations" ADD "quotationCheckedById" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "quotations" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."quotations_status_enum"`);
    await queryRunner.query(
      `ALTER TABLE "quotations" ADD "status" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "quotations" DROP COLUMN "reference"`);
    await queryRunner.query(
      `ALTER TABLE "quotations" ADD "quotationCheckedBy" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotations" ADD CONSTRAINT "FK_5519693a608fb07e023bb7133b4" FOREIGN KEY ("quotationCheckedBy") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
