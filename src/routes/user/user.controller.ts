import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  signup(@Body(new ValidationPipe()) data: CreateUserDto) {
    return this.userService.createUser(data);
  }

  @Post('login')
  login(@Body(new ValidationPipe()) data: LoginUserDto) {
    return this.userService.login(data);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  getAllUsersWithPosts() {
    return this.userService.getAllUsersWithPosts();
  }

  @Get('post-count')
  @UseInterceptors(ClassSerializerInterceptor)
  getAllUsersWithPostCount() {
    return this.userService.getAllUsersWithPostCount();
  }
}
