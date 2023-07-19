import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import supertokens from 'supertokens-node';
import { SupertokensExceptionFilter } from './auth/auth.filter';
import * as SuperTokensConfig from '../config';
import { VersioningType } from '@nestjs/common';
import { PgNotifyServer } from 'nestjs-pg-notify';


async function bootstrap() {

  const app = await NestFactory.create(AppModule, { rawBody: true });

  app.enableCors({
    origin: [SuperTokensConfig.appInfo.websiteDomain],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  });
  app.useGlobalFilters(new SupertokensExceptionFilter());
  app.setGlobalPrefix("api")
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
    defaultVersion: '1',
  });
  await app.init()

  const config = new DocumentBuilder()
    .setTitle("WatchZone api")
    .setDescription("WatchZone multimedia streaming platform")
    .setVersion("1.0")
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
  console.log(await app.getUrl())
}
bootstrap()
  .catch((err) => {
    console.log(err)
  })
