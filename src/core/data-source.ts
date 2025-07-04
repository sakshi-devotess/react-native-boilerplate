import { typeOrmConfig } from '../config/typeOrm';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource(typeOrmConfig());
