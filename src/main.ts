import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 7002;
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();
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
