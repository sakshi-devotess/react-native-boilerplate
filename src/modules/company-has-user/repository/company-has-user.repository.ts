import { CompanyHasUser } from '../entities/company-has-user.entity';
import { dataSource } from '../../../core/data-source';

export const companyHasUserRepository =
  dataSource.getRepository(CompanyHasUser);
