import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(process.env.TODO_API_PREFIX);
  app.enableCors({
    origin: [`${process.env.TODO_FE_HOST}:${process.env.TODO_FE_PORT}`],
  });
  await app.listen(3000);
}
bootstrap();
