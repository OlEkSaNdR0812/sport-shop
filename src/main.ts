import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as cors from 'cors';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

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
 

  app.useStaticAssets(join(__dirname, '..', 'uploads')); 
  await app.listen(3001);
}
bootstrap();