import { MigrationInterface, QueryRunner } from 'typeorm';

export class EmployeeIdAdded1716639152800 implements MigrationInterface {
  name = 'EmployeeIdAdded1716639152800';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "employees" ADD "tin" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD "contractLetter" jsonb`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD "employeeIdPhoto" jsonb`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD "kebeleIdPhoto" jsonb`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "employees" DROP COLUMN "kebeleIdPhoto"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" DROP COLUMN "employeeIdPhoto"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" DROP COLUMN "contractLetter"`,
    );
    await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "tin"`);
  }
}
