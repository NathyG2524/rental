import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateOnProject1720091091225 implements MigrationInterface {
  name = 'UpdateOnProject1720091091225';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "projects" DROP CONSTRAINT "FK_f55144dc92df43cd1dad5d29b90"`,
    );
    await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "createdById"`);
    await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "clientId"`);
    await queryRunner.query(
      `ALTER TABLE "projects" ADD "clientId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" ADD CONSTRAINT "FK_091f9433895a53408cb8ae3864f" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "projects" DROP CONSTRAINT "FK_091f9433895a53408cb8ae3864f"`,
    );
    await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "clientId"`);
    await queryRunner.query(
      `ALTER TABLE "projects" ADD "clientId" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "projects" ADD "createdById" uuid`);
    await queryRunner.query(
      `ALTER TABLE "projects" ADD CONSTRAINT "FK_f55144dc92df43cd1dad5d29b90" FOREIGN KEY ("createdById") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
