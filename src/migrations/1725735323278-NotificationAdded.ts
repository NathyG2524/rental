import { MigrationInterface, QueryRunner } from 'typeorm';

export class NotificationAdded1725735323278 implements MigrationInterface {
  name = 'NotificationAdded1725735323278';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "notifications" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying NOT NULL, "content" character varying NOT NULL, "isNew" boolean NOT NULL DEFAULT true, "employeeId" uuid NOT NULL, CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "notifications" ADD CONSTRAINT "FK_6018a5cad24d71d841a407929cb" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "notifications" DROP CONSTRAINT "FK_6018a5cad24d71d841a407929cb"`,
    );
    await queryRunner.query(`DROP TABLE "notifications"`);
  }
}
