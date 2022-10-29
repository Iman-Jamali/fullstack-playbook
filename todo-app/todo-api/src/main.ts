import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.TODO_API_PORT || 3000;
  await app.listen(port);
  console.log(`API is running on port ${port}`)
}
bootstrap();
