import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateOnDepartmentTeams1723709695652
  implements MigrationInterface
{
  name = 'UpdateOnDepartmentTeams1723709695652';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "department_teams" DROP CONSTRAINT "FK_d0fb615d30d955c9ff38636b2cb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "department_teams" DROP COLUMN "projectsId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "department_teams" ADD "teamLeadId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "department_teams" DROP CONSTRAINT "FK_69e381d48ffc1966aba661dedcc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "department_teams" ALTER COLUMN "departmentId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "department_teams" ADD CONSTRAINT "FK_2994553a3f13053dd146c3577f1" FOREIGN KEY ("teamLeadId") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "department_teams" ADD CONSTRAINT "FK_69e381d48ffc1966aba661dedcc" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "department_teams" DROP CONSTRAINT "FK_69e381d48ffc1966aba661dedcc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "department_teams" DROP CONSTRAINT "FK_2994553a3f13053dd146c3577f1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "department_teams" ALTER COLUMN "departmentId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "department_teams" ADD CONSTRAINT "FK_69e381d48ffc1966aba661dedcc" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "department_teams" DROP COLUMN "teamLeadId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "department_teams" ADD "projectsId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "department_teams" ADD CONSTRAINT "FK_d0fb615d30d955c9ff38636b2cb" FOREIGN KEY ("projectsId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
  }
}
