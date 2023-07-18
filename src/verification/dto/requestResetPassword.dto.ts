import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Validate } from 'class-validator';
import { Match } from '../../shared/decorators/validations/confirmPassword';
import * as sanitizeHtml from 'sanitize-html';
import { Transform, TransformFnParams } from 'class-transformer';

export class requestResetPasswordTokenDto {

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @Transform((e: TransformFnParams) => sanitizeHtml(e.value as string))
    email: string
}