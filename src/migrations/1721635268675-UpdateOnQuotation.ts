import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateOnQuotation1721635268675 implements MigrationInterface {
  name = 'UpdateOnQuotation1721635268675';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "quotation_items" DROP CONSTRAINT "FK_daed37b90fdb61300eabb8e2743"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotation_items" RENAME COLUMN "quotationId" TO "projectId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" ADD "quotationId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotation_items" ADD CONSTRAINT "FK_e582ec8e6f35e8e0bd948b265c4" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" ADD CONSTRAINT "FK_9edde14ad6acc58b0dff17ee0f9" FOREIGN KEY ("quotationId") REFERENCES "quotations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "projects" DROP CONSTRAINT "FK_9edde14ad6acc58b0dff17ee0f9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotation_items" DROP CONSTRAINT "FK_e582ec8e6f35e8e0bd948b265c4"`,
    );
    await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "quotationId"`);
    await queryRunner.query(
      `ALTER TABLE "quotation_items" RENAME COLUMN "projectId" TO "quotationId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotation_items" ADD CONSTRAINT "FK_daed37b90fdb61300eabb8e2743" FOREIGN KEY ("quotationId") REFERENCES "quotations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
