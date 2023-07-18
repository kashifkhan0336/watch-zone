import { Injectable } from '@nestjs/common';
import EmailVerification from "supertokens-node/recipe/emailverification";
import ThirdPartyEmailPassword from "supertokens-node/recipe/thirdpartyemailpassword";
import { sendEmail } from 'supertokens-node/recipe/thirdpartyemailpassword'
import { verifyResetPasswordPasscodeDto, verifyResetPasswordTokenDto } from './dto';
import { requestResetPasswordTokenDto } from './dto';
import { PrismaService } from 'src/shared/services/prisma.service';
import { generatePasscode } from './utils/generatePasscode.util';
@Injectable()
export class VerificationService {
    constructor(
        private readonly prismaService: PrismaService
    ) { }
    async verifyEmail(token: string): Promise<string> {
        try {
            // If the token creation is successful, use the token to verify the user's email
            await EmailVerification.verifyEmailUsingToken(token);
            return "email verified"
        } catch (err) {
            return err
        }
    }

    async verifyResetPasswordToken(data: verifyResetPasswordTokenDto) {
        console.log(data)
    }

    async requestResetPasswordPasscode(data: requestResetPasswordTokenDto
    ) {
        console.log(data);
        const user = await this.prismaService.user.findFirst({
            where: { email: data.email },
            include: { verificationToken: true }
        });
        if (!user) {
            console.log("User not found!");
            return;
        }

        const currentTime = new Date();
        const fifteenMinutesAgo = new Date(currentTime.getTime() - 15 * 60 * 1000);

        if (user.verificationToken) {
            const tokenCreatedAt = user.verificationToken.createdAt;
            if (tokenCreatedAt >= fifteenMinutesAgo) {
                console.log("Recently requested! Please wait.");
                return;
            }
        }

        console.log("User found. Sending reset link...");
        const passcode = await generatePasscode();
        await this.prismaService.user.update({
            where: { email: user.email },
            data: {
                verificationToken: {
                    update: {
                        token: passcode
                    }
                }
            }
        })
        
        console.log("Token sent successfully.");
}

    async verifyResetPasswordPasscode(data: verifyResetPasswordPasscodeDto) {
    console.log(data)
}
}
