import { MiddlewareConsumer, Module, NestModule, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MikroOrmMiddleware, MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroORM } from '@mikro-orm/core';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movie/movie.module';

import * as SuperTokensConfig from '../config';
const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
}

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN)
  }
  return null
}
@Module({
  imports: [MikroOrmModule.forRoot(), UserModule, AuthModule.forRoot({
    // try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
    connectionURI: SuperTokensConfig.connectionUri,
    // apiKey: "IF YOU HAVE AN API KEY FOR THE CORE, ADD IT HERE",
    apiKey: "JMXL5n7PVgXT2fMYMKnk",
    appInfo: SuperTokensConfig.appInfo,
  }), MovieModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly orm: MikroORM) { }

  async onModuleInit(): Promise<void> {
    await this.orm.getMigrator().up();
    const generator = this.orm.getSchemaGenerator();
    await generator.updateSchema();
  }
}
