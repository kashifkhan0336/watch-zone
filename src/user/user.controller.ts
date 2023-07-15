import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { CreateUserDto, updateUserPasswordDto } from './dto';
import { UserService } from './user.service';
import { ValidationPipe } from 'src/shared/pipes/validation.pipe';
import { AuthGuard } from 'src/auth/auth.guard';
import { Session } from 'src/auth/session.decorator';
import { SessionContainer } from 'supertokens-node/recipe/session';
import UserMetadata from "supertokens-node/recipe/usermetadata";

@Controller('/')
@UseGuards(new AuthGuard())
export class UserController {
    constructor(private readonly userService: UserService) {

    }
    @Get()
    findAll(): string {
        return "200 OK!"
    }

    @Get("/profile")

    async getProfile(@Session() session: SessionContainer): Promise<string> {
        const userId = session.getUserId();

        await UserMetadata.updateUserMetadata(userId, { plan: "premium" })
        return "successfully!"
    }

    @Post("/changePassword")
    async changePassword(@Session() session: SessionContainer, @Body() updateUserPasswordDto: updateUserPasswordDto): Promise<any> {

        return this.userService.changePassword(session!.getUserId(), updateUserPasswordDto)
    }

    @Post("/changeEmail")
    async changeEmail(@Session() session: SessionContainer): Promise<any> {
        this.userService.changeEmail()
    }
}
