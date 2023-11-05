import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/entity/board.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { hash, compare } from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(data: CreateUserDto) {
    const { username, password, nickname } = data;

    const encryptedPassword = await this.encrypt(password);

    const result = this.userRepository.save({
      username,
      password: encryptedPassword,
      nickname,
    });
    return result;
  }

  async getUserByUsername(username: string) {
    const user = await this.userRepository.findOneBy({ username });
    if (!user) {
      throw new HttpException(
        '해당 사용자는 존재하지 않습니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async login(data: LoginUserDto) {
    const { username, password } = data;

    const user = await this.getUserByUsername(username);

    const isMatched = await compare(password, user.password);
    if (!isMatched) {
      throw new HttpException(
        '사용자 인증 과정에서 문제가 발생했습니다.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = {
      username,
      nickname: user.nickname,
    };
    const accessToken = jwt.sign(payload, process.env.JWT, {
      expiresIn: '1h',
    });

    return { access: accessToken };
  }

  async getAllUsersWithPosts() {
    const result = await this.userRepository.find({
      relations: {
        boards: true,
      },
      select: {
        boards: {
          id: true,
          title: true,
        },
      },
    });
    return result;
  }

  async getAllUsersWithPostCount() {
    const qb = this.userRepository.createQueryBuilder();

    qb.addSelect((subQuery) => {
      return subQuery
        .select('count(id)')
        .from(Board, 'Board')
        .where('Board.userId = User.id');
    }, 'User_postCount');

    return qb.getMany();
  }

  async encrypt(password: string) {
    const defaultSalt = 10;
    return hash(password, defaultSalt);
  }
}
