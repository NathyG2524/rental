import { MigrationInterface, QueryRunner } from 'typeorm';

export class EventListAdded1720097054858 implements MigrationInterface {
  name = 'EventListAdded1720097054858';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "event_lists" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "start" date NOT NULL, "end" date NOT NULL, CONSTRAINT "PK_a11a7a7ce5dd7a898aadce8326b" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "event_lists"`);
  }
}
