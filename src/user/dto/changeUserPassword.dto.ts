import { IsNotEmpty, IsStrongPassword, Validate } from 'class-validator';
import { Match } from '../../shared/decorators/validations/confirmPassword';

export class updateUserPasswordDto {
    @IsNotEmpty()
    currentPassword: string;

    @IsNotEmpty()
    @IsStrongPassword()
    newPassword: string;

    @Match(updateUserPasswordDto, (s) => s.newPassword)
    @IsNotEmpty()
    confirmPassword: string;
}