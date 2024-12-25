import { MigrationInterface, QueryRunner } from "typeorm";

export class Category1735102704096 implements MigrationInterface {
    name = 'Category1735102704096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vendors" ADD "category" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vendors" DROP COLUMN "category"`);
    }

}
