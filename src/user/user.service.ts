import { Inject, Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto';
import ThirdPartyEmailPassword from "supertokens-node/recipe/thirdpartyemailpassword";
import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import { Prisma } from '@prisma/client';
import { STRIPE_CLIENT } from 'src/stripe/constants';
import Stripe from 'stripe';
@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        @Inject(STRIPE_CLIENT) private stripe: Stripe
    ) { }

    async create(userId: string): Promise<any> {
        let userInfo = await ThirdPartyEmailPassword.getUserById(userId);
        const customer = await this.stripe.customers.create({
            email: userInfo.email
        })
        return this.prisma.user.create({ data: { userId, customerId: customer.id } })
    }

    async changePassword() {

    }
    async changeEmail() {

    }
}
