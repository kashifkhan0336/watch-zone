import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { Session } from './auth/session.decorator';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("/webhook")
  test(@Req() request: Request) {
      console.log(request.body)
  }
}
