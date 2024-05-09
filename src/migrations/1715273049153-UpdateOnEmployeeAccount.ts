import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateOnEmployeeAccount1715273049153
  implements MigrationInterface
{
  name = 'UpdateOnEmployeeAccount1715273049153';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "employee_accounts" ADD "isPasswordUpdated" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "employee_accounts" DROP COLUMN "isPasswordUpdated"`,
    );
  }
}
