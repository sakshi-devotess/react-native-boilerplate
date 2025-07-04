import { Company } from '../entities/company.entity';
import { dataSource } from '../../../core/data-source';

export const companyRepository = dataSource.getRepository(Company);
