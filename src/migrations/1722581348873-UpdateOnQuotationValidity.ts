import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateOnQuotationValidity1722581348873
  implements MigrationInterface
{
  name = 'UpdateOnQuotationValidity1722581348873';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "quotations" DROP COLUMN "validityPeriod"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotations" ADD "validityPeriod" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "quotations" DROP COLUMN "validityPeriod"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotations" ADD "validityPeriod" TIMESTAMP NOT NULL`,
    );
  }
}
