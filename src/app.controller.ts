import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('auth/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const user = await this.appService.googleLogin(req);
    // Перенаправлення на головну сторінку після успішної авторизації
    res.redirect('/'); 
  }

  @Get()
  getHome(@Req() req) {
    return { message: 'Welcome to the Home Page' };
  }
}
