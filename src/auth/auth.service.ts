import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/routes/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.getUserByUsername(username);
    if (user) {
      const isMatched = await compare(password, user.password);
      if (isMatched) {
        return user;
      } else {
        throw new HttpException(
          '사용자 인증 과정에서 문제가 발생했습니다.',
          HttpStatus.UNAUTHORIZED,
        );
      }
    }
  }

  async login(user: User) {
    const payload = {
      id: user.id,
      username: user.username,
      nickname: user.nickname,
    };

    return {
      access: this.jwtService.sign(payload),
    };
  }
}
