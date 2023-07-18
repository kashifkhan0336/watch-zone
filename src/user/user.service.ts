import { Inject, Injectable } from '@nestjs/common';
import EmailPassword from "supertokens-node/recipe/emailpassword";
import { CreateUserDto, updateUserPasswordDto } from './dto';
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

    async create(userId: string, email: string): Promise<any> {
        let userInfo = await ThirdPartyEmailPassword.getUserById(userId);
        const customer = await this.stripe.customers.create({
            email: userInfo.email
        })
        return this.prisma.user.create({ data: { userId, customerId: customer.id, email } })
    }

    async changePassword(userId: string, passwordInfo: updateUserPasswordDto): Promise<string> {
        let userInfo = await ThirdPartyEmailPassword.getUserById(userId)
        let isPasswordValid = await ThirdPartyEmailPassword.emailPasswordSignIn(userInfo.email, passwordInfo.currentPassword)
        console.log(isPasswordValid)
        if (isPasswordValid.status != "OK") {
            return "Invalid current password"

        }
        let response = await ThirdPartyEmailPassword.updateEmailOrPassword({
            userId,
            password: passwordInfo.newPassword
        })
        if (response.status === "PASSWORD_POLICY_VIOLATED_ERROR") {
            // TODO: handle incorrect password error
            return "passowrd policy bullshit i don't understand"
        }
        return "password updated!"
    }
    async changeEmail() {

    }
}
