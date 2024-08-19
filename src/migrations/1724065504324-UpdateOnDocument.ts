import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateOnDocument1724065504324 implements MigrationInterface {
  name = 'UpdateOnDocument1724065504324';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "clients" ADD "companyName" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" ADD "contactPersonName" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" ADD "contactPersonPhone" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_leave_requests" ADD "withNote" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "departments" ADD CONSTRAINT "UQ_8681da666ad9699d568b3e91064" UNIQUE ("name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "leave_types" ADD CONSTRAINT "UQ_e41bb9537ef5e65ee2de2cfa81a" UNIQUE ("name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" ADD CONSTRAINT "UQ_1f4e7ad920d61102278c4b7bb5c" UNIQUE ("name", "email")`,
    );
    await queryRunner.query(
      `ALTER TABLE "vendors" ADD CONSTRAINT "UQ_fc266c9408a0cd27beb0d924f40" UNIQUE ("name", "email")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "vendors" DROP CONSTRAINT "UQ_fc266c9408a0cd27beb0d924f40"`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" DROP CONSTRAINT "UQ_1f4e7ad920d61102278c4b7bb5c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "leave_types" DROP CONSTRAINT "UQ_e41bb9537ef5e65ee2de2cfa81a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "departments" DROP CONSTRAINT "UQ_8681da666ad9699d568b3e91064"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_leave_requests" DROP COLUMN "withNote"`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" DROP COLUMN "contactPersonPhone"`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" DROP COLUMN "contactPersonName"`,
    );
    await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "companyName"`);
  }
}
