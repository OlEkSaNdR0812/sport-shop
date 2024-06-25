import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { Roles } from './auth/roles/decorator';
import { RolesGuard } from './auth/roles/guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { User } from './entity/user';

@ApiTags('Authentication')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('auth/google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Google Authentication' })
  @ApiResponse({ status: 200, description: 'Redirect to Google for authentication' })
  async googleAuth(@Req() req) {}

  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Google Authentication Callback' })
  @ApiResponse({ status: 200, description: 'User information', type: User })
  @ApiResponse({ status: 401, description: 'Authentication failed' })
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    try {
      const user = await this.appService.googleLogin(req);
      console.log('User after Google Login:', user);
      req.session.user = user.user;
      res.redirect('http://127.0.0.1:5500/src/public/HomePage.html');
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Authentication failed' });
    }
  }

  @Get()
  @ApiOperation({ summary: 'Home Page' })
  @ApiResponse({ status: 200, description: 'Welcome to the Home Page' })
  getHome(@Req() req) {
    return { message: 'Welcome to the Home Page' };
  }

  @Get('admin')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Get Admin Data' })
  @ApiResponse({ status: 200, description: 'This is admin data', type: String })
  getAdminData(@Req() req) {
    console.log('User in Admin Route:', req.session.user);
    return 'This is admin data';
  }
}
