import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateOnAccountPayable1722261950060 implements MigrationInterface {
  name = 'UpdateOnAccountPayable1722261950060';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account_payables" DROP CONSTRAINT "FK_39d689812a552a747988ccbb40f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_payables" RENAME COLUMN "vendorId" TO "invoiceId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_payable_details" ADD "type" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_payable_details" ADD "status" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_payable_details" ADD "vendorId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_payables" ADD CONSTRAINT "FK_eceea2aedf72da0d036dc498af7" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_payable_details" ADD CONSTRAINT "FK_ce2872b5409b68df0219097cb3c" FOREIGN KEY ("vendorId") REFERENCES "vendors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account_payable_details" DROP CONSTRAINT "FK_ce2872b5409b68df0219097cb3c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_payables" DROP CONSTRAINT "FK_eceea2aedf72da0d036dc498af7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_payable_details" DROP COLUMN "vendorId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_payable_details" DROP COLUMN "status"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_payable_details" DROP COLUMN "type"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_payables" RENAME COLUMN "invoiceId" TO "vendorId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_payables" ADD CONSTRAINT "FK_39d689812a552a747988ccbb40f" FOREIGN KEY ("vendorId") REFERENCES "vendors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
