import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUrlsTable1740945730907 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "url" (
        "slug" VARCHAR PRIMARY KEY NOT NULL,
        "originalUrl" VARCHAR NOT NULL,
        "createdAt" TIMESTAMP DEFAULT now()
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "url";`);
  }
}
