import { MigrationInterface, QueryRunner } from "typeorm";

export class Exchange1733395817881 implements MigrationInterface {
    name = 'Exchange1733395817881'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" ADD "personalEmail" character varying NOT NULL DEFAULT 'test@251Communication.com'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "personalEmail"`);
    }

}
