import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateOnDepartmentTeamMemner1723633497536
  implements MigrationInterface
{
  name = 'UpdateOnDepartmentTeamMemner1723633497536';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "department_teams" DROP CONSTRAINT "FK_7553cfcccb31ab9229bf7cf953c"`,
    );
    await queryRunner.query(
      `CREATE TABLE "department_team_members" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "employeeId" uuid NOT NULL, "departmentTeamId" uuid NOT NULL, CONSTRAINT "PK_c05e1ca81ea10b912628b69da1b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "department_teams" DROP COLUMN "departmentTasksId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "department_team_members" ADD CONSTRAINT "FK_62d05de4538c6d0e337163b46aa" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "department_team_members" ADD CONSTRAINT "FK_233d8876a71df198b4c7ffeb99a" FOREIGN KEY ("departmentTeamId") REFERENCES "department_teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "department_team_members" DROP CONSTRAINT "FK_233d8876a71df198b4c7ffeb99a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "department_team_members" DROP CONSTRAINT "FK_62d05de4538c6d0e337163b46aa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "department_teams" ADD "departmentTasksId" uuid`,
    );
    await queryRunner.query(`DROP TABLE "department_team_members"`);
    await queryRunner.query(
      `ALTER TABLE "department_teams" ADD CONSTRAINT "FK_7553cfcccb31ab9229bf7cf953c" FOREIGN KEY ("departmentTasksId") REFERENCES "project_tasks"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
  }
}
