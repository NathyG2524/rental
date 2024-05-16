import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateOnEmployee1715273334291 implements MigrationInterface {
  name = 'UpdateOnEmployee1715273334291';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "employees" ADD "phone" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "phone"`);
  }
}
