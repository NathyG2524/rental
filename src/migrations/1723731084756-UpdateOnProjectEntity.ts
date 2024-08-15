import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateOnProjectEntity1723731084756 implements MigrationInterface {
  name = 'UpdateOnProjectEntity1723731084756';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "operating_costs" DROP CONSTRAINT "FK_849a4a1222b88f1210c301ab4a0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "operating_costs" DROP COLUMN "projectId"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "operating_costs" ADD "projectId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "operating_costs" ADD CONSTRAINT "FK_849a4a1222b88f1210c301ab4a0" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
