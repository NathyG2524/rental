import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateOnProjectModel1721649280209 implements MigrationInterface {
  name = 'UpdateOnProjectModel1721649280209';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "projects" DROP CONSTRAINT "FK_e7661a56c53bfdcfd99d067299f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" ALTER COLUMN "departmentTeamId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" ADD CONSTRAINT "FK_e7661a56c53bfdcfd99d067299f" FOREIGN KEY ("departmentTeamId") REFERENCES "department_teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "projects" DROP CONSTRAINT "FK_e7661a56c53bfdcfd99d067299f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" ALTER COLUMN "departmentTeamId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" ADD CONSTRAINT "FK_e7661a56c53bfdcfd99d067299f" FOREIGN KEY ("departmentTeamId") REFERENCES "department_teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
