import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsBoolean, MaxLength, ValidateIf, IsInt } from 'class-validator';
import { User } from '../../user/entities/user.entity';

@Index('otp_requests _pkey', ['id'], { unique: true })
@Entity('otp_requests ', { schema: 'public' })
export class OtpRequests {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @IsInt()
  @Column('integer', { name: 'user_id' })
  user_id: number;

  @MaxLength(6)
  @Column('character varying', {
    name: 'otp_code',
    nullable: true,
    length: 6,
  })
  otp_code: string | null;

  @Column('bigint', { name: 'created', nullable: true })
  created: string | null;

  @Column('boolean', {
    name: 'is_used',
    nullable: true,
    default: () => 'false',
  })
  is_used: boolean | null;

  @ManyToOne(() => User, (user) => user.otp_requests_s)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
}
