import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as cors from 'cors';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cors({
    origin: 'http://127.0.0.1:5500', // Дозволити запити з цього домену
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));

  app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }, 
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Sport Shop API')
    .setDescription('The Sport Shop API documentation')
    .setVersion('0.0.1')
    .addTag('sportshop')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Збереження документації у JSON-файл
  writeFileSync('./swagger.json', JSON.stringify(document, null, 2));
  // Serve static files
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/', // Додайте префікс до URL
  });

  await app.listen(3001);
}
bootstrap();
