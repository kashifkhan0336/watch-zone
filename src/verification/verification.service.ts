import { Injectable } from '@nestjs/common';
import EmailVerification from "supertokens-node/recipe/emailverification";

@Injectable()
export class VerificationService {
    async verifyEmail(token: string): Promise<string> {
        try {
            // If the token creation is successful, use the token to verify the user's email
            await EmailVerification.verifyEmailUsingToken(token);
            return "email verified"
        } catch (err) {
            return err
        }
    }

    async resetPassword(token: string) {
        console.log(token)
    }
}
