import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { PaymentService } from 'src/payment/payment.service';
import { PrismaService } from 'src/shared/services/prisma.service';

@Module({
  providers: [WebhookService, PaymentService, PrismaService],
  controllers: [WebhookController],
})
export class WebhookModule { }
