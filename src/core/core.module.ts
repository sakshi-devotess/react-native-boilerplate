import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { JwtAuthGuard } from './guards/auth-guard';

@Module({
  controllers: [],
  imports: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [],
})
export class CoreModule {}
