import { Controller, Get, Inject, UseGuards, Body } from '@nestjs/common';
import { expand } from 'rxjs';
import { STRIPE_CLIENT } from 'src/stripe/constants';
import Stripe from 'stripe';
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { Session } from 'src/auth/session.decorator';
import ThirdPartyEmailPassword from "supertokens-node/recipe/thirdpartyemailpassword";
import { PaymentService } from './payment.service';
import { PriceResponse } from './interfaces/priceResponse.interface';
import { createSubscriptionDTO } from './dto/createSubscription.dto';
@Controller('payment')
@UseGuards(new AuthGuard())
export class PaymentController {
    constructor(
        private paymentService: PaymentService
    ) { }
    @Get("/customers")
    async listCustomers(@Session() session: SessionContainer) {
        let userId = session.getUserId();

        let userInfo = await ThirdPartyEmailPassword.getUserById(userId);
        return userInfo;
    }

    @Get("/prices")
    async Prices(): Promise<PriceResponse> {
        return this.paymentService.getPrices()
    }

    @Get("/create_subscription")
    async createSubscription(@Body() createSubscriptionDTO: createSubscriptionDTO, @Session() session: SessionContainer) {
        return this.paymentService.createSubscription(session.getUserId())
    }
}
