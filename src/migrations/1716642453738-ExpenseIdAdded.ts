import { MigrationInterface, QueryRunner } from 'typeorm';

export class ExpenseIdAdded1716642453738 implements MigrationInterface {
  name = 'ExpenseIdAdded1716642453738';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "operating_cost_details" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "cost" numeric NOT NULL, "operatingCostId" uuid NOT NULL, CONSTRAINT "PK_2f3ab0db7c37ee098caba3f1491" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "operating_costs" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "budgetAmount" numeric NOT NULL, "spendingAmount" numeric NOT NULL, "projectId" uuid NOT NULL, CONSTRAINT "PK_be7234de68bbeb982a4632ee908" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "expense_details" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "cost" numeric NOT NULL, "expenseId" uuid NOT NULL, CONSTRAINT "PK_8012987d153b25cc960f171b920" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "expenses" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "budgetAmount" numeric NOT NULL, "spendingAmount" numeric NOT NULL, CONSTRAINT "PK_94c3ceb17e3140abc9282c20610" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "operating_cost_details" ADD CONSTRAINT "FK_d9de2632bb9b2cae459960355a5" FOREIGN KEY ("operatingCostId") REFERENCES "operating_costs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "operating_costs" ADD CONSTRAINT "FK_849a4a1222b88f1210c301ab4a0" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "expense_details" ADD CONSTRAINT "FK_5e674eff495dcaa21f1ae716351" FOREIGN KEY ("expenseId") REFERENCES "expenses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "expense_details" DROP CONSTRAINT "FK_5e674eff495dcaa21f1ae716351"`,
    );
    await queryRunner.query(
      `ALTER TABLE "operating_costs" DROP CONSTRAINT "FK_849a4a1222b88f1210c301ab4a0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "operating_cost_details" DROP CONSTRAINT "FK_d9de2632bb9b2cae459960355a5"`,
    );
    await queryRunner.query(`DROP TABLE "expenses"`);
    await queryRunner.query(`DROP TABLE "expense_details"`);
    await queryRunner.query(`DROP TABLE "operating_costs"`);
    await queryRunner.query(`DROP TABLE "operating_cost_details"`);
  }
}
