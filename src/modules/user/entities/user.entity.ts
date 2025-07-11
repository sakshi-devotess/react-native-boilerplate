import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsBoolean, MaxLength, ValidateIf, IsInt } from 'class-validator';
import { CompanyHasUser } from '../../company-has-user/entities/company-has-user.entity';
import { OtpRequests } from '../../otp-requests/entities/otp-requests.entity';
import { File } from '../../file/entities/file.entity';

@Index('user_pkey', ['id'], { unique: true })
@Entity('user', { schema: 'public' })
export class User {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', {
    name: 'created_by_company_has_user_id',
    nullable: true,
  })
  @ValidateIf((o) => o.created_by_company_has_user_id != null)
  @IsInt()
  created_by_company_has_user_id: number | null;

  @Column('character varying', {
    name: 'first_name',
    nullable: true,
    length: 64,
  })
  @ValidateIf((o) => o.first_name != null)
  @MaxLength(64)
  first_name: string | null;

  @Column('character varying', {
    name: 'last_name',
    nullable: true,
    length: 64,
  })
  @ValidateIf((o) => o.last_name != null)
  @MaxLength(64)
  last_name: string | null;

  @Column('text', { name: 'mpin', nullable: true })
  mpin: string | null;

  @Column('bigint', { name: 'created', nullable: true })
  created: string | null;

  @Column('boolean', { name: 'active', nullable: true })
  active: boolean | null;

  @Column('integer', { name: 'file_id', nullable: true })
  @ValidateIf((o) => o.file_id != null)
  @IsInt()
  file_id: number | null;

  @Column('character varying', { name: 'email', nullable: true, length: 64 })
  @ValidateIf((o) => o.email != null)
  @MaxLength(64)
  email: string | null;

  @Column('character varying', { name: 'mobile', nullable: true, length: 64 })
  @ValidateIf((o) => o.mobile !== null)
  @MaxLength(64)
  mobile: string | null;

  @OneToMany(
    () => CompanyHasUser,
    (company_has_user) => company_has_user.user_2,
  )
  company_has_users: CompanyHasUser[];

  @OneToMany(() => OtpRequests, (otp_requests) => otp_requests.user)
  otp_requests_s: OtpRequests[];

  @ManyToOne(() => CompanyHasUser, (company_has_user) => company_has_user.users)
  @JoinColumn([
    { name: 'created_by_company_has_user_id', referencedColumnName: 'id' },
  ])
  created_by_company_has_user: CompanyHasUser;

  @ManyToOne(() => File, (file) => file.users)
  @JoinColumn([{ name: 'file_id', referencedColumnName: 'id' }])
  file: File;
}
