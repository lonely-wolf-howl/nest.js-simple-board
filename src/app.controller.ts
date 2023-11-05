import {
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { IP } from './decorators/ip.decorator';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}
  private readonly logger = new Logger(AppController.name);

  @Get()
  testRoute(@IP() ip: string) {
    console.log(this.configService.get<String>('ENVIRONMENT'));
    this.logger.debug(ip);
    return ip;
  }

  // param/...
  @Get('param/:name')
  getNameParam(@Param('name') name: string): string {
    return `Hello, ${name}!`;
  }

  // query?name=...
  @Get('query')
  getNameQuery(@Query('name') name: string): string {
    return `Hello, ${name}!`;
  }

  @UseGuards(LocalAuthGuard)
  @Post('passport/login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('passport/my-info')
  async getmyInfo(@Request() req: any) {
    return req.user;
  }
}
