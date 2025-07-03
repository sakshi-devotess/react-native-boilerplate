import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1715854795070 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE IF NOT EXISTS "user"(
        id SERIAL PRIMARY KEY,
        created_by_company_has_user_id INTEGER,
        username VARCHAR(64) UNIQUE,
        first_name VARCHAR(64),
        last_name VARCHAR(64),
        password TEXT,
        created BIGINT,
        active BOOLEAN
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
        organization_number VARCHAR(64),
        reference VARCHAR(64),
        active BOOLEAN,
        created_by_company_has_user_id INTEGER,
        our_reference_company_has_user_id INTEGER,
        company_type_id INTEGER REFERENCES "company_type" NOT NULL,
        logo_file_id integer,
        created BIGINT
    );

    CREATE TABLE IF NOT EXISTS "company_has_user"(
        id SERIAL PRIMARY KEY,
        created_by_company_has_user_id INTEGER REFERENCES "company_has_user",
        company_id INTEGER REFERENCES "company" NOT NULL,
        user_id INTEGER REFERENCES "user" NOT NULL,
        email VARCHAR(64),
        phone VARCHAR(64),
        mobilephone VARCHAR(64),
        active BOOLEAN,
        created BIGINT
    );

    ALTER TABLE "user"
    ADD CONSTRAINT created_by_company_has_user_id_fkey
    FOREIGN KEY (created_by_company_has_user_id) REFERENCES company_has_user(id);

    ALTER TABLE "company"
    ADD CONSTRAINT created_by_company_has_user_id_fkey
    FOREIGN KEY (created_by_company_has_user_id) REFERENCES company_has_user(id);
   
    ALTER TABLE "company"
    ADD CONSTRAINT our_reference_company_has_user_id_fkey
    FOREIGN KEY (our_reference_company_has_user_id) REFERENCES company_has_user(id);

    INSERT INTO "company_type"
        ( name, type, active)
        VALUES('Super Admin', 1, true),
        ('Admin', 2, true);

        
        INSERT INTO "user"
        (created_by_company_has_user_id, username, first_name, last_name, password, active)
        VALUES (null,'admin','Admin','dogpark','$2b$10$9llBFhBBo3LhpVkqPtQ39.tbAQZirsuWvB3HfqbXaVzsB5dQchFTu',true);
          

        INSERT INTO "company"(
         name, organization_number, reference, active, created_by_company_has_user_id,
         our_reference_company_has_user_id, company_type_id)
        VALUES ('Saas-Innova', '559023-6989', 'Karin', true, null, null, 1);

        
         INSERT INTO "company_has_user"(
         created_by_company_has_user_id, company_id, user_id, email, phone, mobilephone, active)
        VALUES (null, 1, 1, 'admin@gmail.com', null,null,true);
    

        UPDATE "user"
        SET created_by_company_has_user_id=1
        WHERE id = 1;

        UPDATE company
        SET created_by_company_has_user_id=1, our_reference_company_has_user_id=1
        WHERE id=1;

        UPDATE company_has_user
        SET created_by_company_has_user_id=1
        WHERE id=1;

        DO $$
        BEGIN

        IF EXISTS(SELECT *
            FROM information_schema.columns
                WHERE table_name='user' and column_name='created_by_company_has_user_id')
        THEN
            ALTER TABLE "user"
                ALTER COLUMN created_by_company_has_user_id SET NOT NULL;
        END IF;

        IF EXISTS(SELECT *
            FROM information_schema.columns
                WHERE table_name='company' and column_name='created_by_company_has_user_id')
        THEN
            ALTER TABLE "company"
                ALTER COLUMN created_by_company_has_user_id SET NOT NULL;
        END IF;

        IF EXISTS(SELECT *
            FROM information_schema.columns
                WHERE table_name='company' and column_name='our_reference_company_has_user_id')
        THEN
            ALTER TABLE "company"
                ALTER COLUMN our_reference_company_has_user_id SET NOT NULL;
        END IF;


        IF EXISTS(SELECT *
            FROM information_schema.columns
                WHERE table_name='company_has_user' and column_name='created_by_company_has_user_id')
        THEN
            ALTER TABLE "company_has_user"
                ALTER COLUMN created_by_company_has_user_id SET NOT NULL;
        END IF;

        END $$;

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
      END $$ LANGUAGE plpgsql 
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "user";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "company_type";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "company";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "company_has_user";`);
  }
}
