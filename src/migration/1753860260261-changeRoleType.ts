import { MigrationInterface, QueryRunner } from 'typeorm'

export class ChangeRoleType1753860260261 implements MigrationInterface {
    name = 'ChangeRoleType1753860260261'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "role"`)
        await queryRunner.query(
            `ALTER TABLE "admin" ADD "role" character varying NOT NULL`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "role"`)
        await queryRunner.query(
            `ALTER TABLE "admin" ADD "role" integer NOT NULL`,
        )
    }
}
