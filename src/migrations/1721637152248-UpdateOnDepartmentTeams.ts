import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOnDepartmentTeams1721637152248 implements MigrationInterface {
    name = 'UpdateOnDepartmentTeams1721637152248'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_tasks" DROP CONSTRAINT "FK_0cc5ae66c5540216ec900d52a6b"`);
        await queryRunner.query(`ALTER TABLE "project_tasks" RENAME COLUMN "projectTeamId" TO "departmentTeamId"`);
        await queryRunner.query(`CREATE TABLE "department_teams" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "departmentId" uuid, "projectsId" uuid, "departmentTasksId" uuid, CONSTRAINT "PK_22d27e77d42e53539523fcb5899" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "departmentTeamId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project_tasks" ADD CONSTRAINT "FK_22d56ec0331ec0716ad9c4231f1" FOREIGN KEY ("departmentTeamId") REFERENCES "department_teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "department_teams" ADD CONSTRAINT "FK_69e381d48ffc1966aba661dedcc" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "department_teams" ADD CONSTRAINT "FK_d0fb615d30d955c9ff38636b2cb" FOREIGN KEY ("projectsId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "department_teams" ADD CONSTRAINT "FK_7553cfcccb31ab9229bf7cf953c" FOREIGN KEY ("departmentTasksId") REFERENCES "project_tasks"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_e7661a56c53bfdcfd99d067299f" FOREIGN KEY ("departmentTeamId") REFERENCES "department_teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_e7661a56c53bfdcfd99d067299f"`);
        await queryRunner.query(`ALTER TABLE "department_teams" DROP CONSTRAINT "FK_7553cfcccb31ab9229bf7cf953c"`);
        await queryRunner.query(`ALTER TABLE "department_teams" DROP CONSTRAINT "FK_d0fb615d30d955c9ff38636b2cb"`);
        await queryRunner.query(`ALTER TABLE "department_teams" DROP CONSTRAINT "FK_69e381d48ffc1966aba661dedcc"`);
        await queryRunner.query(`ALTER TABLE "project_tasks" DROP CONSTRAINT "FK_22d56ec0331ec0716ad9c4231f1"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "departmentTeamId"`);
        await queryRunner.query(`DROP TABLE "department_teams"`);
        await queryRunner.query(`ALTER TABLE "project_tasks" RENAME COLUMN "departmentTeamId" TO "projectTeamId"`);
        await queryRunner.query(`ALTER TABLE "project_tasks" ADD CONSTRAINT "FK_0cc5ae66c5540216ec900d52a6b" FOREIGN KEY ("projectTeamId") REFERENCES "project_teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
