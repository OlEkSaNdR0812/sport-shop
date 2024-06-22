import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { Roles } from './auth/roles/decorator';
import { RolesGuard } from './auth/roles/guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('auth/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    try {
      const user = await this.appService.googleLogin(req);
      console.log('User after Google Login:', user); // Debugging statement
      req.session.user = user.user; // Ensure session is available and set the user information
      res.redirect('/');
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Authentication failed' });
    }
  }

  @Get()
  getHome(@Req() req) {
    return { message: 'Welcome to the Home Page' };
  }

  @Get('admin')
  @UseGuards(RolesGuard)
  @Roles('admin')
  getAdminData(@Req() req) {
    console.log('User in Admin Route:', req.session.user); 
    return 'This is admin data';
  }
}
