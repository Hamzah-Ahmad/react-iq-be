import { NestFactory, Reflector } from '@nestjs/core';
import helmet from 'helmet';
import * as cookieParser from "cookie-parser";

import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { LoggerService } from './core/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.use(cookieParser())
  app.useLogger(app.get(LoggerService));
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableCors({
    origin: process.env.CLIENT_ORIGIN, // Replace with your React app's URL
    credentials: true,
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });
  const PORT = process.env.PORT || 4010;
  const HOST = `0.0.0.0`;
  await app.listen(PORT, HOST);
}
bootstrap();
