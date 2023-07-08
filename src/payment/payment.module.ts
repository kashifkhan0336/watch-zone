import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';

import { PaymentController } from './payment.controller';
import { StripeModule } from 'src/stripe/stripe.module';

@Module({
  providers: [PaymentService],
  imports: [StripeModule.forRoot(process.env.STRIPE_SECRET_KEY, { apiVersion: "2022-11-15" })],
  controllers: [PaymentController]
})
export class PaymentModule {

}
