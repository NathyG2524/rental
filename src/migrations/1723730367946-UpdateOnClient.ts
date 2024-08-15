import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateOnClient1723730367946 implements MigrationInterface {
  name = 'UpdateOnClient1723730367946';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "employees" ADD "bankAccount" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD "jobTitle" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "clients" ADD "secondaryEmail" text`);
    await queryRunner.query(`ALTER TABLE "clients" ADD "secondaryPhone" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "clients" DROP COLUMN "secondaryPhone"`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" DROP COLUMN "secondaryEmail"`,
    );
    await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "jobTitle"`);
    await queryRunner.query(
      `ALTER TABLE "employees" DROP COLUMN "bankAccount"`,
    );
  }
}
