import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/entity/board.entity';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  async findAll() {
    const posts = await this.boardRepository.find();
    if (posts.length === 0) {
      return '게시물이 없습니다.';
    }
    return posts;
  }

  async findOneById(id: number) {
    const post = await this.boardRepository.findOneBy({ id });
    if (!post) {
      throw new HttpException(
        '해당 게시물은 존재하지 않습니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    return post;
  }

  async create(data: CreateBoardDto) {
    const createdPost = this.boardRepository.create(data);
    await this.boardRepository.save(createdPost);
    return createdPost;
  }

  async update(userId: number, id: number, data: UpdateBoardDto) {
    const post = await this.findOneById(id);
    if (userId !== post.userId) {
      throw new UnauthorizedException();
    }

    const result = await this.boardRepository.update(id, {
      ...data,
    });
    if (result.affected === 0) {
      return 'fail';
    }
    return 'success';
  }

  async delete(userId: number, id: number) {
    const post = await this.findOneById(id);
    if (userId !== post.userId) {
      throw new UnauthorizedException();
    }

    const deletedPost = await this.boardRepository.remove(post);
    return deletedPost;
  }
}
