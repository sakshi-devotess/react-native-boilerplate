import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MaxLength } from 'class-validator';
import { Company } from '../../company/entities/company.entity';
import { User } from '../../user/entities/user.entity';

@Index('file_pkey', ['id'], { unique: true })
@Entity('file', { schema: 'public' })
export class File {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('text', { name: 'path', nullable: true })
  path: string | null;

  @Column('bigint', { name: 'created', nullable: true })
  created: string | null;

  @MaxLength(256)
  @Column('character varying', {
    name: 'original_name',
    nullable: true,
    length: 256,
  })
  original_name: string | null;

  @OneToMany(() => Company, (company) => company.logo_file)
  companies: Company[];

  @OneToMany(() => User, (user) => user.file)
  users: User[];
}
