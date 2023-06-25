import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import supertokens from 'supertokens-node';
import { SupertokensExceptionFilter } from './auth/auth.filter';
import * as SuperTokensConfig from '../config';


async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [SuperTokensConfig.appInfo.websiteDomain],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  });
  app.useGlobalFilters(new SupertokensExceptionFilter());
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
