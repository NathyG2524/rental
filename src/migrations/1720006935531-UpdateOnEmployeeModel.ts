import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateOnEmployeeModel1720006935531 implements MigrationInterface {
  name = 'UpdateOnEmployeeModel1720006935531';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "employee_leave_requests" ADD "approvedAt" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD "remainingLeaveDays" integer NOT NULL DEFAULT '16'`,
    );
    await queryRunner.query(
      `ALTER TABLE "departments" ALTER COLUMN "location" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "departments" ALTER COLUMN "location" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" DROP COLUMN "remainingLeaveDays"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_leave_requests" DROP COLUMN "approvedAt"`,
    );
  }
}
