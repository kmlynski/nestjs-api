import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug'],
    bufferLogs: true,
  });
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const port: number = 3000;
  const logger = app.get(Logger);
  app.useLogger(app.get(Logger));
  await app.listen(port);
  logger.log('Server is running on <http://localhost:3000>');
}
bootstrap();
