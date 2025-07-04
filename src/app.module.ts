import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { dataSource } from './core/data-source';
import { ApplicationModules } from './modules/application.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CoreModule,
    ...ApplicationModules,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppService,
    {
      provide: DataSource,
      useFactory: async () => {
        await dataSource
          .initialize()
          .then(() => {
            console.log('Data Source has been initialized successfully.');
          })
          .catch((err) => {
            console.log('Error during Data Source initialization:', err);
          });
        return dataSource;
      },
    },
  ],
})
export class AppModule {}
