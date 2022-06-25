import {
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { of } from 'rxjs';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly config: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('name')
  getName(@Req() request) {
    return this.appService.getName();
  }

  @Post('name')
  create() {
    return {
      name: 'haibo',
    };
  }

  @Get('haibo-*')
  @HttpCode(400)
  @Header('custom', 'haibo')
  getOther() {
    return 'haibo';
  }

  @Get('redirect')
  @Redirect('www.baidu.com', 301)
  redirect() {
    return 'redirect';
  }

  @Get('doc')
  getDoc(@Query('version') version = '10') {
    return {
      version: version,
    };
  }

  @Get('doc/:id')
  getDocId(@Param('id') id) {
    return {
      id,
    };
  }

  @Get('rxjs')
  getRxjs() {
    return of([1, 2, 3, 4]);
  }

  @Get('service')
  getConfig() {
    return this.config.get<string>('DATABASE_USER');
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getJwt(@Request() req) {
    return req.user;
  }
}
