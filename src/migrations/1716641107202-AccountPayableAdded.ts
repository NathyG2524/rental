import { MigrationInterface, QueryRunner } from 'typeorm';

export class AccountPayableAdded1716641107202 implements MigrationInterface {
  name = 'AccountPayableAdded1716641107202';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "account_payables" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "dueDate" TIMESTAMP NOT NULL, "status" character varying NOT NULL, "vendorId" uuid NOT NULL, CONSTRAINT "PK_aa7f310f7ff87900eb72fb1c4cf" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "account_payable_details" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "unit" numeric NOT NULL, "amount" numeric NOT NULL, "paid" numeric NOT NULL, "accountPayableId" uuid NOT NULL, CONSTRAINT "PK_59da294c6f42e1c8b082cc89357" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "account_receivables" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "dueDate" TIMESTAMP NOT NULL, "status" character varying NOT NULL, "clientId" uuid NOT NULL, CONSTRAINT "PK_a8f82fd2bde8d1fdad07a441e13" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "account_receivable_details" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "unit" numeric NOT NULL, "amount" numeric NOT NULL, "paid" numeric NOT NULL, "accountReceivableId" uuid NOT NULL, CONSTRAINT "PK_d8cc140d2456ad72efe0db0a300" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_payables" ADD CONSTRAINT "FK_39d689812a552a747988ccbb40f" FOREIGN KEY ("vendorId") REFERENCES "vendors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_payable_details" ADD CONSTRAINT "FK_5b8ba73604823f3a22daec52c9c" FOREIGN KEY ("accountPayableId") REFERENCES "account_payables"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_receivables" ADD CONSTRAINT "FK_3433676f9d01082c466ea094f08" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_receivable_details" ADD CONSTRAINT "FK_5431763701f3a622177c4a952f7" FOREIGN KEY ("accountReceivableId") REFERENCES "account_receivables"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account_receivable_details" DROP CONSTRAINT "FK_5431763701f3a622177c4a952f7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_receivables" DROP CONSTRAINT "FK_3433676f9d01082c466ea094f08"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_payable_details" DROP CONSTRAINT "FK_5b8ba73604823f3a22daec52c9c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_payables" DROP CONSTRAINT "FK_39d689812a552a747988ccbb40f"`,
    );
    await queryRunner.query(`DROP TABLE "account_receivable_details"`);
    await queryRunner.query(`DROP TABLE "account_receivables"`);
    await queryRunner.query(`DROP TABLE "account_payable_details"`);
    await queryRunner.query(`DROP TABLE "account_payables"`);
  }
}
