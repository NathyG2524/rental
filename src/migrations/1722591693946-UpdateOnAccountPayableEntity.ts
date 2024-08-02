import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateOnAccountPayableEntity1722591693946
  implements MigrationInterface
{
  name = 'UpdateOnAccountPayableEntity1722591693946';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account_payable_details" ALTER COLUMN "paid" SET DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account_payable_details" ALTER COLUMN "paid" DROP DEFAULT`,
    );
  }
}
