import { IsNotEmpty, IsString, IsStrongPassword, Validate } from 'class-validator';
import { Match } from '../../shared/decorators/validations/confirmPassword';
import * as sanitizeHtml from 'sanitize-html';
import { Transform, TransformFnParams } from 'class-transformer';

export class verifyResetPasswordTokenDto {

    @IsNotEmpty()
    @IsString()
    @Transform((e: TransformFnParams) => sanitizeHtml(e.value as string))
    token: string

    @IsNotEmpty()
    @IsStrongPassword()
    @Transform((e: TransformFnParams) => sanitizeHtml(e.value as string))
    newPassword: string;

    @Match(verifyResetPasswordTokenDto, (s) => s.newPassword)
    @Transform((e: TransformFnParams) => sanitizeHtml(e.value as string))
    @IsNotEmpty()
    confirmPassword: string;
}