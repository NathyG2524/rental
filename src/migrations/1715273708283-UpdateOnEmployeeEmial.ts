import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateOnEmployeeEmial1715273708283 implements MigrationInterface {
  name = 'UpdateOnEmployeeEmial1715273708283';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "UQ_765bc1ac8967533a04c74a9f6af" UNIQUE ("email")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "employees" DROP CONSTRAINT "UQ_765bc1ac8967533a04c74a9f6af"`,
    );
  }
}
