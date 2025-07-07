import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { validationErrorsCheck } from './commons/helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 7002;

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const errors = validationErrorsCheck(validationErrors);
        return new BadRequestException(errors);
      },
    }),
  );
  if (process.env.MODE === 'DEV') {
    // Swagger
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('BoilerPlate API')
      .setDescription('Backend APIs')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
  }
  await app.listen(port);
}
bootstrap();
