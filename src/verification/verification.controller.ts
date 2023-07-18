import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { verifyResetPasswordTokenDto } from './dto';
import { requestResetPasswordTokenDto } from './dto';
import { verifyResetPasswordPasscodeDto } from './dto'
@Controller('verification')
export class VerificationController {
    constructor(
        private verificationService: VerificationService
    ) {

    }
    @Get("email")
    async verifyEmailToken(@Query("token") token: string): Promise<string> {
        console.log(token)
        return this.verificationService.verifyEmail(token)
    }

    @Post("reset/verify/token")
    async verifyResetPasswordToken(
        @Body() verifyResetPasswordTokenDto: verifyResetPasswordTokenDto) {
        return this.verificationService.verifyResetPasswordToken(verifyResetPasswordTokenDto)
    }

    @Post("reset/verify/passcode")
    async verifyResetPasswordPasscode(
        @Body() verifyResetPasswordPasscodeDto: verifyResetPasswordPasscodeDto) {
        return this.verificationService.verifyResetPasswordPasscode(verifyResetPasswordPasscodeDto)
    }

    @Post("reset/request")
    async requestResetPasswordToken(
        @Body() requestResetPasswordTokenDto: requestResetPasswordTokenDto
    ) {
        return this.verificationService.requestResetPasswordPasscode(requestResetPasswordTokenDto)
    }
}






