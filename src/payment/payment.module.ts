import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ConfigModule } from '@nestjs/config';
@Module({
  providers: [PaymentService],
  imports: [ConfigModule.forRoot({
    envFilePath: ".stripe.env"
  })]
})
export class PaymentModule { }
