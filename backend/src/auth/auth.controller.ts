import { Controller, Get, Body, Post, Res, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Request, Response, response } from 'express';

interface RequestWithUser extends Request {
  user: any; // 이 부분에 실제 유저 객체의 타입을 지정해야 합니다.
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Get('check')
  async check() {
    return 'hello wrold'
  }

  @Post('login')
  async login(@Res() response: Response, @Body() userData: { username: string, password: string }) {
    return this.authService.login(response, userData);
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@Res() response: Response) {
    return this.authService.logout(response);
  }

  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @Post('authCheck')
  @UseGuards(AuthGuard('jwt'))
  async authCheck(@Req() request: RequestWithUser, @Res() response: Response) {
    return this.authService.authCheck(request, response);
  }
}
