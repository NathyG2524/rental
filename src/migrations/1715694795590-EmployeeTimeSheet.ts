import { MigrationInterface, QueryRunner } from "typeorm";

export class EmployeeTimeSheet1715694795590 implements MigrationInterface {
    name = 'EmployeeTimeSheet1715694795590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_time_sheets" ADD "status" character varying NOT NULL DEFAULT 'PRESENT'`);
        await queryRunner.query(`ALTER TABLE "employee_time_sheets" ADD "date" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "employee_accounts" ADD "lastLogon" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "employee_time_sheets" ADD CONSTRAINT "UQ_68b7cb9ebd31827f46f6a7d5f2e" UNIQUE ("employeeId", "date")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_time_sheets" DROP CONSTRAINT "UQ_68b7cb9ebd31827f46f6a7d5f2e"`);
        await queryRunner.query(`ALTER TABLE "employee_accounts" DROP COLUMN "lastLogon"`);
        await queryRunner.query(`ALTER TABLE "employee_time_sheets" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "employee_time_sheets" DROP COLUMN "status"`);
    }

}
