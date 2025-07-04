import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsInt } from 'class-validator';
import { Company } from '../../company/entities/company.entity';
import { User } from '../../user/entities/user.entity';

@Index('company_has_user_pkey', ['id'], { unique: true })
@Entity('company_has_user', { schema: 'public' })
export class CompanyHasUser {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @IsInt()
  @Column('integer', {
    name: 'created_by_company_has_user_id',
    nullable: true,
  })
  created_by_company_has_user_id: number | null;

  @IsInt()
  @Column('integer', { name: 'company_id' })
  company_id: number;

  @IsInt()
  @Column('integer', { name: 'user_id' })
  user_id: number;

  @Column('boolean', { name: 'active', nullable: true })
  active: boolean | null;

  @Column('bigint', { name: 'created', nullable: true })
  created: string | null;

  @OneToMany(() => Company, (company) => company.created_by_company_has_user)
  companies: Company[];

  @ManyToOne(() => Company, (company) => company.company_has_users)
  @JoinColumn([{ name: 'company_id', referencedColumnName: 'id' }])
  company: Company;

  @ManyToOne(
    () => CompanyHasUser,
    (company_has_user) => company_has_user.company_has_users,
  )
  @JoinColumn([
    { name: 'created_by_company_has_user_id', referencedColumnName: 'id' },
  ])
  created_by_company_has_user: CompanyHasUser;

  @OneToMany(
    () => CompanyHasUser,
    (company_has_user) => company_has_user.created_by_company_has_user,
  )
  company_has_users: CompanyHasUser[];

  @ManyToOne(() => User, (user) => user.company_has_users)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user_2: User;

  @OneToMany(() => User, (user) => user.created_by_company_has_user)
  users: User[];
}
