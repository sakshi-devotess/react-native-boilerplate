import { typeOrmConfig } from 'src/config/typeOrm';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource(typeOrmConfig());
