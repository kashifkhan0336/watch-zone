import { Controller, Get, Param, Query } from '@nestjs/common';
import { VerificationService } from './verification.service';

@Controller('verification')
export class VerificationController {
    constructor(
        private verificationService: VerificationService
    ) {

    }
    @Get("email")
    async verifyEmail(@Query("token") token: string): Promise<string> {
        console.log(token)
        return this.verificationService.verifyEmail(token)
    }

    @Get("reset")
    async resetPassword(@Query("token") token: string) {
        console.log(token)
    }
}






