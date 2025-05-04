import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAdminTable1744324036145 implements MigrationInterface {
    name = 'CreateAdminTable1744324036145'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`admin\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_5e568e001f9d1b91f67815c580\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`open_close\` (\`id\` int NOT NULL AUTO_INCREMENT, \`day\` varchar(255) NOT NULL, \`openTime\` varchar(255) NOT NULL, \`closeTime\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`open_close\``);
        await queryRunner.query(`DROP INDEX \`IDX_5e568e001f9d1b91f67815c580\` ON \`admin\``);
        await queryRunner.query(`DROP TABLE \`admin\``);
    }

}
