import { MigrationInterface, QueryRunner } from 'typeorm';

export class EmployeeLeaveUpdated1719992844965 implements MigrationInterface {
  name = 'EmployeeLeaveUpdated1719992844965';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "employee_leave_requests" ADD "approvedById" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_leave_requests" ADD CONSTRAINT "FK_ec41aec6bfea3bb399f489e6e19" FOREIGN KEY ("approvedById") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "employee_leave_requests" DROP CONSTRAINT "FK_ec41aec6bfea3bb399f489e6e19"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_leave_requests" DROP COLUMN "approvedById"`,
    );
  }
}
