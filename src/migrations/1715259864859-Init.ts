import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1715259864859 implements MigrationInterface {
  name = 'Init1715259864859';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "employee_time_sheets" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "employeeId" uuid NOT NULL, CONSTRAINT "PK_ba16d7b9738a286d25e476484d7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "projects" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "type" character varying NOT NULL, "clientId" character varying NOT NULL, "createdById" uuid, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "clients" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "additionalInfo" jsonb, "createdById" uuid NOT NULL, CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "departments" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "location" character varying NOT NULL, "permissions" text, "responsiblePersonId" uuid NOT NULL, CONSTRAINT "REL_0ea7ee325451b026afd9af26c9" UNIQUE ("responsiblePersonId"), CONSTRAINT "PK_839517a681a86bb84cbcc6a1e9d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "employee_accounts" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, "permissions" text, "employeeId" uuid NOT NULL, CONSTRAINT "REL_654548866ec44cbe87b72eb0c4" UNIQUE ("employeeId"), CONSTRAINT "PK_c43f1a4433ff1c78db0f5950b21" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "vendors" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "tin" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "additionalInfo" jsonb, "createdById" uuid NOT NULL, CONSTRAINT "PK_9c956c9797edfae5c6ddacc4e6e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "employees" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "idNo" character varying NOT NULL, "email" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "startDate" TIMESTAMP NOT NULL, "details" jsonb, "status" character varying NOT NULL DEFAULT 'Active', "departmentId" uuid, CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "social_medias" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "link" character varying NOT NULL, "managerId" uuid NOT NULL, CONSTRAINT "PK_f2f504aa5f1f4b2378057984362" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "employee_leave_allocations" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "employeeId" uuid NOT NULL, "allowedDate" integer NOT NULL, "leaveTypeId" uuid NOT NULL, CONSTRAINT "PK_b1be8a4fa6b2ad2acda38ea0683" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "employee_leave_requests" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "employeeId" uuid NOT NULL, "effectiveFrom" TIMESTAMP NOT NULL, "effectiveTo" TIMESTAMP NOT NULL, "reason" character varying, "document" jsonb, "leaveTypeId" uuid NOT NULL, CONSTRAINT "PK_94c4b25356712d57d2646571144" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "leave_types" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "maxAllowedDate" integer NOT NULL, "isPayment" boolean NOT NULL, "isOptional" boolean NOT NULL, "includesHolidays" boolean NOT NULL, CONSTRAINT "PK_359223e0755d19711813cd07394" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_time_sheets" ADD CONSTRAINT "FK_3a46e4829550e00e3c52363ef7d" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" ADD CONSTRAINT "FK_f55144dc92df43cd1dad5d29b90" FOREIGN KEY ("createdById") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" ADD CONSTRAINT "FK_d9da07105d53c46866e802f2590" FOREIGN KEY ("createdById") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "departments" ADD CONSTRAINT "FK_0ea7ee325451b026afd9af26c9f" FOREIGN KEY ("responsiblePersonId") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_accounts" ADD CONSTRAINT "FK_654548866ec44cbe87b72eb0c4d" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vendors" ADD CONSTRAINT "FK_7e6bf6f6083214da6e63be425ab" FOREIGN KEY ("createdById") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_4edfe103ebf2fcb98dbb582554b" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "social_medias" ADD CONSTRAINT "FK_189620f1482a269aba8ff0198f8" FOREIGN KEY ("managerId") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_leave_allocations" ADD CONSTRAINT "FK_13748b69ee3f62c1feef901fcd8" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_leave_allocations" ADD CONSTRAINT "FK_f0fee20eefca02a25992291b320" FOREIGN KEY ("leaveTypeId") REFERENCES "leave_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_leave_requests" ADD CONSTRAINT "FK_d12081e49fd51054b5011459dac" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_leave_requests" ADD CONSTRAINT "FK_d7de5f6e77d3567a7aeb28d47c3" FOREIGN KEY ("leaveTypeId") REFERENCES "leave_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "employee_leave_requests" DROP CONSTRAINT "FK_d7de5f6e77d3567a7aeb28d47c3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_leave_requests" DROP CONSTRAINT "FK_d12081e49fd51054b5011459dac"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_leave_allocations" DROP CONSTRAINT "FK_f0fee20eefca02a25992291b320"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_leave_allocations" DROP CONSTRAINT "FK_13748b69ee3f62c1feef901fcd8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "social_medias" DROP CONSTRAINT "FK_189620f1482a269aba8ff0198f8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employees" DROP CONSTRAINT "FK_4edfe103ebf2fcb98dbb582554b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vendors" DROP CONSTRAINT "FK_7e6bf6f6083214da6e63be425ab"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_accounts" DROP CONSTRAINT "FK_654548866ec44cbe87b72eb0c4d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "departments" DROP CONSTRAINT "FK_0ea7ee325451b026afd9af26c9f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" DROP CONSTRAINT "FK_d9da07105d53c46866e802f2590"`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" DROP CONSTRAINT "FK_f55144dc92df43cd1dad5d29b90"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_time_sheets" DROP CONSTRAINT "FK_3a46e4829550e00e3c52363ef7d"`,
    );
    await queryRunner.query(`DROP TABLE "leave_types"`);
    await queryRunner.query(`DROP TABLE "employee_leave_requests"`);
    await queryRunner.query(`DROP TABLE "employee_leave_allocations"`);
    await queryRunner.query(`DROP TABLE "social_medias"`);
    await queryRunner.query(`DROP TABLE "employees"`);
    await queryRunner.query(`DROP TABLE "vendors"`);
    await queryRunner.query(`DROP TABLE "employee_accounts"`);
    await queryRunner.query(`DROP TABLE "departments"`);
    await queryRunner.query(`DROP TABLE "clients"`);
    await queryRunner.query(`DROP TABLE "projects"`);
    await queryRunner.query(`DROP TABLE "employee_time_sheets"`);
  }
}
