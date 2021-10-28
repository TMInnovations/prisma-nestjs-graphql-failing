import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Startup');

  logger.log(
    `Environment variables loaded: ${JSON.stringify(process.env, null, 2)}`,
  );

  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    },
  });
  await app.listen(3000).then(async () => {
    logger.log(`Running in debug on ${await app.getUrl()}`);
  });
}

bootstrap();
const logger = new Logger('main.js');
process.on('unhandledRejection', up => {
  logger.error((up as Error).stack);
  process.exit(1);
});
