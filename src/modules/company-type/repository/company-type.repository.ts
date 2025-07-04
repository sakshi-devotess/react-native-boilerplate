import { CompanyType } from '../entities/company-type.entity';
import { dataSource } from '../../../core/data-source';

export const companyTypeRepository = dataSource.getRepository(CompanyType);
