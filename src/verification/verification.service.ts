import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import EmailVerification from "supertokens-node/recipe/emailverification";
import ThirdPartyEmailPassword from "supertokens-node/recipe/thirdpartyemailpassword";

import { verifyResetPasswordPasscodeDto, verifyResetPasswordTokenDto } from './dto';
import { requestResetPasswordTokenDto } from './dto';
import { PrismaService } from 'src/shared/services/prisma.service';
import { generatePasscode } from './utils/generatePasscode.util';
import * as moment from "moment";
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class VerificationService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly mailService: MailerService
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
        const _ = await ThirdPartyEmailPassword.resetPasswordUsingToken(data.token, data.newPassword)
        if (_.status == "RESET_PASSWORD_INVALID_TOKEN_ERROR") {
            throw new HttpException("invalid or expired token", HttpStatus.FORBIDDEN)
        }
        return _
    }

    async requestResetPasswordPasscode(data: requestResetPasswordTokenDto
    ) {
        console.log(data);
        const passcode = await generatePasscode();
        const user = await this.prismaService.user.findFirst({
            where: { email: data.email },
            include: { verificationToken: true }
        });
        if (!user) {
            console.log("User not found!");
            return;
        }


        console.log("User found. Sending reset link...");
        if (!user.verificationToken) {
            const t = await this.prismaService.verificationTokens.create({
                data: {
                    code: passcode, user: {
                        connect: { userId: user.userId }
                    }
                }
            })
            await this.mailService
                .sendMail({
                    to: user.email, // list of receivers
                    from: 'kashifkhan0336@gmail.com', // sender address
                    subject: 'Password reset', // Subject line
                    template: 'passwordReset',
                    context: {
                        passcode: t.code
                    }
                })
                .then(() => {
                    return "passcode sent!"
                })
                .catch((err) => { return err });

        } else {
            // if (moment().diff(moment(user.verificationToken.updatedAt), 'minute') < 15) {
            //     return user.verificationToken
            // }
            try {
                await this.prismaService.user.update({
                    where: {
                        userId: user.userId
                    },
                    data: {
                        verificationToken: {
                            delete: {}
                        }
                    }
                })
                const t = await this.prismaService.verificationTokens.create({
                    data: {
                        code: passcode, user: {
                            connect: { userId: user.userId }
                        }
                    },
                })
                await this.mailService
                    .sendMail({
                        to: user.email, // list of receivers
                        from: 'kashifkhan0336@gmail.com', // sender address
                        subject: 'Password reset', // Subject line
                        template: 'passwordReset',
                        context: {
                            passcode: t.code
                        }
                    })
                    .then(() => {
                        return "passcode sent!"
                    })
                    .catch((err) => { return err });
            } catch (error) {
                return error
            }

        }
    }

    async verifyResetPasswordPasscode(data: verifyResetPasswordPasscodeDto) {
        console.log(data.email)
        const user = await this.prismaService.user.findFirst({
            where: { email: data.email },
            include: { verificationToken: true }
        });
        if (!user) {
            throw new HttpException('something went wrong', HttpStatus.BAD_REQUEST)
        }

        if (!user.verificationToken) {
            throw new HttpException('passcode expired or not found', HttpStatus.BAD_REQUEST)
        }

        if (moment().diff(moment(user.verificationToken.updatedAt), 'minute') > 10) {
            throw new HttpException('passcode expired', HttpStatus.BAD_REQUEST)
        }

        try {
            await this.prismaService.user.update({
                where: {
                    userId: user.userId
                },
                data: {
                    verificationToken: {
                        delete: {}
                    }
                }
            })
            const token = ThirdPartyEmailPassword.createResetPasswordToken(user.userId)
            return token
        } catch (e) {
            return e
        }



    }
}
