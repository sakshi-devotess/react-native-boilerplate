import { AuthModule } from './auth/auth.module';
import { CompanyHasUserModule } from './company-has-user/company-has-user.module';
import { CompanyType } from './company-type/entities/company-type.entity';
import { CompanyModule } from './company/company.module';
import { FileModule } from './file/file.module';
import { OtpRequestsModule } from './otp-requests/otp-requests.module';
import { UserModule } from './user/user.module';

export const ApplicationModules = [
  UserModule,
  CompanyHasUserModule,
  CompanyModule,
  FileModule,
  CompanyType,
  OtpRequestsModule,
  AuthModule,
];
