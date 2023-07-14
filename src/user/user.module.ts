import { Module, ValidationPipe } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { APP_PIPE } from '@nestjs/core';


@Module({
  controllers: [UserController],
  exports: [],
  imports: [],
  providers: [UserService, PrismaService, {
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  },]
})
export class UserModule { }
