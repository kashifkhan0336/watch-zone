import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { UserService } from './user.service';
import { ValidationPipe } from 'src/shared/pipes/validation.pipe';
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {

    }
    @Get()
    findAll(): string {
        return "200 OK!"
    }
    
    @UsePipes(new ValidationPipe())
    @Post("/signUp")
    async create(@Body('user') userData: CreateUserDto) {
        return this.userService.create(userData)
    }
}
