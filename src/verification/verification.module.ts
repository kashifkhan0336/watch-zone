import { Module } from '@nestjs/common';
import { VerificationController } from './verification.controller';
import { VerificationService } from './verification.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { PgNotifyClient } from 'nestjs-pg-notify';
import { ClientProxy, ReadPacket, WritePacket } from '@nestjs/microservices';

@Module({
  controllers: [VerificationController],
  providers: [VerificationService, PrismaService]
  // providers: [VerificationService, PrismaService, {
  //   provide: 'PG_NOTIFY_CLIENT',
  //   useFactory: (): ClientProxy => new PgNotifyClient({
  //     connection: {
  //       host: 'localhost',
  //       port: 5432,
  //       database: 'pgnotify',
  //       user: 'pgnotify',
  //       password: 'pgnotify',
  //     },
  //     strategy: {
  //       retryInterval: 1_000,
  //       retryTimeout: Infinity,
  //     },
  //   })
  // },],

})
export class VerificationModule { }
