import { IsEmail, IsNotEmpty, IsNumberString, IsString, IsStrongPassword, Length, Validate } from 'class-validator';

import * as sanitizeHtml from 'sanitize-html';
import { Transform, TransformFnParams } from 'class-transformer';

export class verifyResetPasswordPasscodeDto {

    @IsNotEmpty()
    @IsNumberString()
    @Length(6, 6)
    @Transform((e: TransformFnParams) => sanitizeHtml(e.value as string))
    passcode: string


    @IsNotEmpty()
    @IsEmail()
    @Transform((e: TransformFnParams) => sanitizeHtml(e.value as string))
    email: string
}