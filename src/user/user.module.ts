import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/shared/services/prisma.service';


@Module({
  controllers: [UserController],
  exports: [],
  imports: [],
  providers: [UserService, PrismaService]
})
export class UserModule { }
