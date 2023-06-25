import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const appOptions = { cors: true };
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("/api/v1")
  const config = new DocumentBuilder()
    .setTitle("WatchZone api")
    .setDescription("WatchZone multimedia streaming platform")
    .setVersion("1.0")
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap()
  .catch((err) => {
    console.log(err)
  })
