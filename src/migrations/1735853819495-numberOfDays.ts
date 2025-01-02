import { MigrationInterface, QueryRunner } from "typeorm";

export class NumberOfDays1735853819495 implements MigrationInterface {
    name = 'NumberOfDays1735853819495'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_leave_requests" ADD "numberOfDays" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_leave_requests" DROP COLUMN "numberOfDays"`);
    }

}
