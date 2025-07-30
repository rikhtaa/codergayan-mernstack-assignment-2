import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitialMigration1753875509686 implements MigrationInterface {
    name = 'InitialMigration1753875509686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "item" ("id" SERIAL NOT NULL, "price" numeric NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "productId" integer, CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" character varying(100) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_29a733971f71626611bb3808ebe" UNIQUE ("description"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `ALTER TABLE "item" ADD CONSTRAINT "FK_ab25455f602addda94c12635c60" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "item" DROP CONSTRAINT "FK_ab25455f602addda94c12635c60"`,
        )
        await queryRunner.query(`DROP TABLE "product"`)
        await queryRunner.query(`DROP TABLE "item"`)
    }
}
