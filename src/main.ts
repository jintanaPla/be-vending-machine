import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { PostModule } from './module/post.module'

async function bootstrap() {
  const app = await NestFactory.create(PostModule);
  app.enableCors()
  await app.listen(3000);
}

bootstrap();

