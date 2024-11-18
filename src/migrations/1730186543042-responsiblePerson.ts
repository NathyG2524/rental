import { MigrationInterface, QueryRunner } from "typeorm";

export class ResponsiblePerson1730186543042 implements MigrationInterface {
    name = 'ResponsiblePerson1730186543042'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "departments" DROP CONSTRAINT "FK_0ea7ee325451b026afd9af26c9f"`);
        await queryRunner.query(`ALTER TABLE "departments" ALTER COLUMN "responsiblePersonId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "departments" ADD CONSTRAINT "FK_0ea7ee325451b026afd9af26c9f" FOREIGN KEY ("responsiblePersonId") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "departments" DROP CONSTRAINT "FK_0ea7ee325451b026afd9af26c9f"`);
        await queryRunner.query(`ALTER TABLE "departments" ALTER COLUMN "responsiblePersonId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "departments" ADD CONSTRAINT "FK_0ea7ee325451b026afd9af26c9f" FOREIGN KEY ("responsiblePersonId") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
