import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateOnSocialMedia1723619763488 implements MigrationInterface {
  name = 'UpdateOnSocialMedia1723619763488';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "social_medias" ADD "followers" numeric`,
    );
    await queryRunner.query(`ALTER TABLE "social_medias" ADD "posts" numeric`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "social_medias" DROP COLUMN "posts"`);
    await queryRunner.query(
      `ALTER TABLE "social_medias" DROP COLUMN "followers"`,
    );
  }
}
