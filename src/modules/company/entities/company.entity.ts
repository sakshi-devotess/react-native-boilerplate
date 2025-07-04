import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MaxLength, IsInt } from 'class-validator';
import { CompanyType } from '../../company-type/entities/company-type.entity';
import { CompanyHasUser } from '../../company-has-user/entities/company-has-user.entity';
import { File } from '../../file/entities/file.entity';

@Index('company_pkey', ['id'], { unique: true })
@Entity('company', { schema: 'public' })
export class Company {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', nullable: true, length: 64 })
  @MaxLength(64)
  name: string | null;

  @MaxLength(64)
  @Column('character varying', {
    name: 'reference',
    nullable: true,
    length: 64,
  })
  reference: string | null;

  @Column('boolean', { name: 'active', nullable: true })
  active: boolean | null;

  @IsInt()
  @Column('integer', {
    name: 'created_by_company_has_user_id',
    nullable: true,
  })
  created_by_company_has_user_id: number | null;

  @IsInt()
  @Column('integer', { name: 'company_type_id' })
  company_type_id: number;

  @IsInt()
  @Column('integer', { name: 'logo_file_id', nullable: true })
  logo_file_id: number | null;

  @Column('bigint', { name: 'created', nullable: true })
  created: string | null;

  @ManyToOne(() => CompanyType, (company_type) => company_type.companies)
  @JoinColumn([{ name: 'company_type_id', referencedColumnName: 'id' }])
  company_type: CompanyType;

  @ManyToOne(
    () => CompanyHasUser,
    (company_has_user) => company_has_user.companies,
  )
  @JoinColumn([
    { name: 'created_by_company_has_user_id', referencedColumnName: 'id' },
  ])
  created_by_company_has_user: CompanyHasUser;

  @ManyToOne(() => File, (file) => file.companies)
  @JoinColumn([{ name: 'logo_file_id', referencedColumnName: 'id' }])
  logo_file: File;

  @OneToMany(
    () => CompanyHasUser,
    (company_has_user) => company_has_user.company,
  )
  company_has_users: CompanyHasUser[];
}
