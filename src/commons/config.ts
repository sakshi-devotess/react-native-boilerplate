import { ConfigModule } from '@nestjs/config';

interface IEnvOptions {
  isRequired?: boolean;
  defaultValue?: any;
}

ConfigModule.forRoot();

export const getEnvVariable = (
  name: string,
  options: IEnvOptions = { isRequired: false },
) => {
  const { isRequired } = options || {};
  const value = process.env[name];
  if (!value && isRequired) {
    console.error(`ENV variable ${name} is required`);
    process.exit(1);
  }
  // eslint-disable-next-line no-prototype-builtins
  if (!value && options?.hasOwnProperty('defaultValue')) {
    return options.defaultValue;
  }
  return value;
};

// Application-specific configuration
export const config = {
  ACCESS_KEY: getEnvVariable('ACCESS_SECRET_KEY', {
    defaultValue: 'value',
  }),
  REFRESH_KEY: getEnvVariable('REFRESH_SECRET_KEY', {
    defaultValue: 'value',
  }),
};
