import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModelsAdded1716637724083 implements MigrationInterface {
  name = 'ModelsAdded1716637724083';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "project_tasks" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "dueDate" TIMESTAMP NOT NULL, "description" character varying, "status" character varying NOT NULL, "assignedEmployeeId" uuid NOT NULL, "assignedReviewerId" uuid NOT NULL, "projectTeamId" uuid NOT NULL, "projectId" uuid NOT NULL, CONSTRAINT "PK_b1b6204912a6f44133df3a4518b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "project_teams" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "departmentId" uuid, "projectId" uuid NOT NULL, CONSTRAINT "PK_01a9679008fec32d42fe331ff10" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "vendor_tasks" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "budget" numeric NOT NULL, "status" character varying NOT NULL, "projectId" uuid NOT NULL, "vendorId" uuid NOT NULL, CONSTRAINT "PK_dc199612d42e37810df2bebffcf" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "invoice_items" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "unitPrice" numeric NOT NULL, "quantity" numeric NOT NULL, "invoiceId" uuid NOT NULL, CONSTRAINT "PK_53b99f9e0e2945e69de1a12b75a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "invoices" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "dueDate" TIMESTAMP NOT NULL, "description" character varying, "status" character varying NOT NULL, "invoiceApprovedById" uuid NOT NULL, "invoiceCheckedById" uuid NOT NULL, "invoiceRequestedById" uuid NOT NULL, "clientId" uuid NOT NULL, CONSTRAINT "PK_668cef7c22a427fd822cc1be3ce" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "quotation_items" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "unitPrice" numeric NOT NULL, "quantity" numeric NOT NULL, "quotationId" uuid NOT NULL, CONSTRAINT "PK_a5ff0786836b65d12bafd0ac91e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "quotations" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "dueDate" TIMESTAMP NOT NULL, "description" character varying, "status" character varying NOT NULL, "quotationApprovedById" uuid NOT NULL, "quotationCheckedById" character varying NOT NULL, "quotationRequestedById" uuid NOT NULL, "clientId" uuid NOT NULL, "quotationCheckedBy" uuid, CONSTRAINT "PK_6c00eb8ba181f28c21ffba7ecb1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_time_sheets" ADD "status" character varying NOT NULL DEFAULT 'PRESENT'`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_time_sheets" ADD "date" date NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_accounts" ADD "lastLogon" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_leave_requests" ADD "status" character varying NOT NULL DEFAULT 'REQUESTED'`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_time_sheets" ADD CONSTRAINT "UQ_68b7cb9ebd31827f46f6a7d5f2e" UNIQUE ("employeeId", "date")`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_tasks" ADD CONSTRAINT "FK_7332f9019eee5967170742b17d0" FOREIGN KEY ("assignedEmployeeId") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_tasks" ADD CONSTRAINT "FK_f4085ba7fe7d96fbabc9d3cc8fb" FOREIGN KEY ("assignedReviewerId") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_tasks" ADD CONSTRAINT "FK_0cc5ae66c5540216ec900d52a6b" FOREIGN KEY ("projectTeamId") REFERENCES "project_teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_tasks" ADD CONSTRAINT "FK_8691c10b6396e041f4b6d48f8a0" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_teams" ADD CONSTRAINT "FK_791af64e23efc9e91b1393f33b6" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_teams" ADD CONSTRAINT "FK_d71c230aff02473fe1ecb50942d" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vendor_tasks" ADD CONSTRAINT "FK_8ea54f62386ed4ca5f382d539ce" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vendor_tasks" ADD CONSTRAINT "FK_d63baafd41b62b7dde652b61dc5" FOREIGN KEY ("vendorId") REFERENCES "vendors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoice_items" ADD CONSTRAINT "FK_7fb6895fc8fad9f5200e91abb59" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD CONSTRAINT "FK_bf223a98d5510fba4208cc89488" FOREIGN KEY ("invoiceApprovedById") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD CONSTRAINT "FK_df31cb8306d5495d39c9a39a9b3" FOREIGN KEY ("invoiceCheckedById") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD CONSTRAINT "FK_0a1616c6a3176bfde32dc79ed23" FOREIGN KEY ("invoiceRequestedById") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD CONSTRAINT "FK_d9df936180710f9968da7cf4a51" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotation_items" ADD CONSTRAINT "FK_daed37b90fdb61300eabb8e2743" FOREIGN KEY ("quotationId") REFERENCES "quotations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotations" ADD CONSTRAINT "FK_f14304546a0ccada4f57fd0897e" FOREIGN KEY ("quotationApprovedById") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotations" ADD CONSTRAINT "FK_5519693a608fb07e023bb7133b4" FOREIGN KEY ("quotationCheckedBy") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotations" ADD CONSTRAINT "FK_0b629498b943f574cde818fb77b" FOREIGN KEY ("quotationRequestedById") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotations" ADD CONSTRAINT "FK_f004dcdca146f7fc5428e57fb57" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "quotations" DROP CONSTRAINT "FK_f004dcdca146f7fc5428e57fb57"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotations" DROP CONSTRAINT "FK_0b629498b943f574cde818fb77b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotations" DROP CONSTRAINT "FK_5519693a608fb07e023bb7133b4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotations" DROP CONSTRAINT "FK_f14304546a0ccada4f57fd0897e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotation_items" DROP CONSTRAINT "FK_daed37b90fdb61300eabb8e2743"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP CONSTRAINT "FK_d9df936180710f9968da7cf4a51"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP CONSTRAINT "FK_0a1616c6a3176bfde32dc79ed23"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP CONSTRAINT "FK_df31cb8306d5495d39c9a39a9b3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP CONSTRAINT "FK_bf223a98d5510fba4208cc89488"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoice_items" DROP CONSTRAINT "FK_7fb6895fc8fad9f5200e91abb59"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vendor_tasks" DROP CONSTRAINT "FK_d63baafd41b62b7dde652b61dc5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vendor_tasks" DROP CONSTRAINT "FK_8ea54f62386ed4ca5f382d539ce"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_teams" DROP CONSTRAINT "FK_d71c230aff02473fe1ecb50942d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_teams" DROP CONSTRAINT "FK_791af64e23efc9e91b1393f33b6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_tasks" DROP CONSTRAINT "FK_8691c10b6396e041f4b6d48f8a0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_tasks" DROP CONSTRAINT "FK_0cc5ae66c5540216ec900d52a6b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_tasks" DROP CONSTRAINT "FK_f4085ba7fe7d96fbabc9d3cc8fb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_tasks" DROP CONSTRAINT "FK_7332f9019eee5967170742b17d0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_time_sheets" DROP CONSTRAINT "UQ_68b7cb9ebd31827f46f6a7d5f2e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_leave_requests" DROP COLUMN "status"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_accounts" DROP COLUMN "lastLogon"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_time_sheets" DROP COLUMN "date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_time_sheets" DROP COLUMN "status"`,
    );
    await queryRunner.query(`DROP TABLE "quotations"`);
    await queryRunner.query(`DROP TABLE "quotation_items"`);
    await queryRunner.query(`DROP TABLE "invoices"`);
    await queryRunner.query(`DROP TABLE "invoice_items"`);
    await queryRunner.query(`DROP TABLE "vendor_tasks"`);
    await queryRunner.query(`DROP TABLE "project_teams"`);
    await queryRunner.query(`DROP TABLE "project_tasks"`);
  }
}
