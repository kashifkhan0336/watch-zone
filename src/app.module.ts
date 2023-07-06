import { MiddlewareConsumer, Module, NestModule, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MediaModule } from './media/media.module';


import * as SuperTokensConfig from '../config';

@Module({
  imports: [UserModule, AuthModule.forRoot({
    // try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
    connectionURI: SuperTokensConfig.connectionUri,
    // apiKey: "IF YOU HAVE AN API KEY FOR THE CORE, ADD IT HERE",

    appInfo: SuperTokensConfig.appInfo,
  }), MediaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() { }

}
