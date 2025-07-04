import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MaxLength, IsInt } from 'class-validator';
import { Company } from '../../company/entities/company.entity';

@Index('company_type_pkey', ['id'], { unique: true })
@Entity('company_type', { schema: 'public' })
export class CompanyType {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('bigint', { name: 'created', nullable: true })
  created: string | null;

  @MaxLength(64)
  @Column('character varying', { name: 'name', nullable: true, length: 64 })
  name: string | null;

  @IsInt()
  @Column('integer', { name: 'type', nullable: true })
  type: number | null;

  @Column('boolean', { name: 'active', nullable: true })
  active: boolean | null;

  @OneToMany(() => Company, (company) => company.company_type)
  companies: Company[];
}
