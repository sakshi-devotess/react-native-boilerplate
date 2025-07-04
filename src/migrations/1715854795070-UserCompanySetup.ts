import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1715854795070 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE IF NOT EXISTS "user"(
        id SERIAL PRIMARY KEY,
        created_by_company_has_user_id INTEGER,
        first_name VARCHAR(64),
        last_name VARCHAR(64),
        mpin TEXT,
        created BIGINT,
        active BOOLEAN,
        file_id INTEGER,
        email VARCHAR(64),
        mobile VARCHAR(64)
    );

    CREATE TABLE IF NOT EXISTS "company_type"(
        id SERIAL PRIMARY KEY,
        created BIGINT,
        name VARCHAR(64),
        type INTEGER,
        active BOOLEAN
    );

    CREATE TABLE IF NOT EXISTS "company"(
        id SERIAL PRIMARY KEY,
        name VARCHAR(64),
        reference VARCHAR(64),
        active BOOLEAN,
        created_by_company_has_user_id INTEGER,
        company_type_id INTEGER REFERENCES "company_type" NOT NULL,
        logo_file_id integer,
        created BIGINT
    );

    CREATE TABLE IF NOT EXISTS "company_has_user"(
        id SERIAL PRIMARY KEY,
        created_by_company_has_user_id INTEGER REFERENCES "company_has_user",
        company_id INTEGER REFERENCES "company" NOT NULL,
        user_id INTEGER REFERENCES "user" NOT NULL,
        active BOOLEAN,
        created BIGINT
    );

    CREATE TABLE IF NOT EXISTS "file"(
        id SERIAL PRIMARY KEY,
        path text,
        created BIGINT,
        original_name VARCHAR(256)
    );

    CREATE TABLE IF NOT EXISTS "otp_requests "(
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES "user" NOT NULL,
        otp_code VARCHAR(6),
        created BIGINT,
        is_used BOOLEAN DEFAULT false
    );

    ALTER TABLE "user"
    ADD CONSTRAINT created_by_company_has_user_id_fkey
    FOREIGN KEY (created_by_company_has_user_id) REFERENCES company_has_user(id);

    ALTER TABLE "company"
    ADD CONSTRAINT created_by_company_has_user_id_fkey
    FOREIGN KEY (created_by_company_has_user_id) REFERENCES company_has_user(id);


    ALTER TABLE "user"
    ADD CONSTRAINT user_file_id_fkey FOREIGN KEY (file_id) REFERENCES file(id);

    ALTER TABLE "company"
        ADD CONSTRAINT fk_logo_file_id
        FOREIGN KEY (logo_file_id) REFERENCES file(id);


    INSERT INTO "company_type"
        ( name, type, active)
        VALUES('Super Admin', 1, true),
        ('Admin', 2, true);

        INSERT INTO "user"
        (created_by_company_has_user_id, first_name, last_name, mpin, active,mobile,email)
        VALUES (null,'Admin','BoilerPlate','$2b$10$9llBFhBBo3LhpVkqPtQ39.tbAQZirsuWvB3HfqbXaVzsB5dQchFTu',true,8577777777,'admin@gmail.com');
          

        INSERT INTO "company"(
         name, reference, active, created_by_company_has_user_id,company_type_id)
        VALUES ('Saas-Innova','Karin', true, null, 1);

        
         INSERT INTO "company_has_user"(
         created_by_company_has_user_id, company_id, user_id,active)
        VALUES (null, 1, 1,true);
    

        UPDATE "user"
        SET created_by_company_has_user_id=1
        WHERE id = 1;

        UPDATE company_has_user
        SET created_by_company_has_user_id=1
        WHERE id=1;

       

    CREATE OR REPLACE FUNCTION set_created() RETURNS trigger AS $$
    /* ------------------------------------------------------------------------------------
    FUNCTION: set_created_date
    DESCRIPTION 	: This function use to generate trigger for created date
    CREATED BY 		: akshi Antala
    CREATED DATE	: 16-May-2024
    ------------------------------------------------------------------------------------*/
    BEGIN
      NEW.created := (extract(epoch from now())*1000);
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    DO $$
        DECLARE
            ct text;
          /* ------------------------------------------------------------------------------------
          SCRIPT: for set_created_date & set_modified_date
          DESCRIPTION     : Set both triggers to all the tables of current database
          CREATED BY 	  : Sakshi Antala
          CREATED DATE    : 16-May-2024
          MODIFIED BY	  : Sakshi Antala
          MODIFIED DATE   : 216-May-2024
          ------------------------------------------------------------------------------------*/
          BEGIN
              FOR ct IN 
              SELECT c.table_name FROM information_schema.columns c
              LEFT JOIN information_schema.tables t ON t.table_name = c.table_name
              WHERE c.column_name = 'created' AND c.table_schema != 'information_schema' AND t.table_type != 'VIEW'
              LOOP
                  EXECUTE format('DROP TRIGGER IF EXISTS set_created on %I',ct);
                  EXECUTE format('CREATE TRIGGER set_created
                                  BEFORE INSERT ON %I
                                  FOR EACH ROW EXECUTE PROCEDURE set_created()',
                                  ct);
          END LOOP;    
      END $$ LANGUAGE plpgsql;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "user";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "company_type";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "company";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "company_has_user";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "file";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "otp_requests";`);
  }
}
