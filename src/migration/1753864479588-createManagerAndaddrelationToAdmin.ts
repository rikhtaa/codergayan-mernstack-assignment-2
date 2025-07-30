import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateManagerAndaddrelationToAdmin1753864479588
    implements MigrationInterface
{
    name = 'CreateManagerAndaddrelationToAdmin1753864479588'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "manager" ("id" SERIAL NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(255) NOT NULL, "createdById" integer, CONSTRAINT "UQ_ee8fba4edb704ce2465753a2edd" UNIQUE ("email"), CONSTRAINT "PK_b3ac840005ee4ed76a7f1c51d01" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(
            `ALTER TABLE "manager" ADD CONSTRAINT "FK_c4639ea2b9c22b62773f96afce9" FOREIGN KEY ("createdById") REFERENCES "admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "manager" DROP CONSTRAINT "FK_c4639ea2b9c22b62773f96afce9"`,
        )
        await queryRunner.query(`DROP TABLE "manager"`)
    }
}
