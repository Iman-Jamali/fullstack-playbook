import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(process.env.TODO_API_PREFIX);
  app.enableCors();
  // app.enableCors({
  //   origin: [`${process.env.TODO_FE_HOST}:${process.env.TODO_FE_PORT}`],
  // });
  const port = process.env.TODO_API_PORT || 3000;
  await app.listen(port);
  console.log(`API is running on port ${port}`)
}
bootstrap();
