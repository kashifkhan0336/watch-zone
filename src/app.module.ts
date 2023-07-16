import { MiddlewareConsumer, Module, NestModule, OnModuleInit, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MediaModule } from './media/media.module';
import { MovieModule } from './movie/movie.module';
import { SeriesModule } from './series/series.module';
import { EpisodeModule } from './episode/episode.module';
import { ProfileModule } from './profile/profile.module';
import { PaymentModule } from './payment/payment.module';
import { StripeModule } from './stripe/stripe.module';
import { ConfigModule } from '@nestjs/config';


import * as SuperTokensConfig from '../config';
import { RawBodyMiddleware } from './shared/middlewares/rawBody.middleware';
import { JsonBodyMiddleware } from './shared/middlewares/jsonBody.middleware';
import { WebhookModule } from './webhook/webhook.module';
import { VerificationModule } from './verification/verification.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule.forRoot({
    // try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
    connectionURI: SuperTokensConfig.connectionUri,
    // apiKey: "IF YOU HAVE AN API KEY FOR THE CORE, ADD IT HERE",

    appInfo: SuperTokensConfig.appInfo,
  }), MediaModule, MovieModule, SeriesModule, EpisodeModule, ProfileModule, PaymentModule, StripeModule, WebhookModule, VerificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
