import { ApiTags } from '@nestjs/swagger';
import { BoardService } from './board.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UpdateBoardDto } from './dto/update-board.dto';
import { UserInfo } from 'src/decorators/user-info.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('board')
@ApiTags('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  findAll() {
    return this.boardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.boardService.findOneById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@UserInfo() userInfo, @Body() data) {
    if (!userInfo) {
      throw new UnauthorizedException();
    }
    return this.boardService.create({
      userId: userInfo.id,
      title: data.title,
      content: data.content,
    });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @UserInfo() userInfo,
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) data: UpdateBoardDto,
  ) {
    return this.boardService.update(userInfo.id, id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@UserInfo() userInfo, @Param('id', ParseIntPipe) id: number) {
    return this.boardService.delete(userInfo.id, id);
  }
}
