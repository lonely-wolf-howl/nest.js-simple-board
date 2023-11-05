import { Test, TestingModule } from '@nestjs/testing';
import { BoardService } from './board.service';
import { Repository } from 'typeorm';
import { Board } from 'src/entity/board.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('BoardService', () => {
  let boardService: BoardService;
  let boardRepository: Repository<Board>;

  const boardRepositoryToken = getRepositoryToken(Board);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoardService,
        {
          provide: boardRepositoryToken,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findOne: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    boardService = module.get<BoardService>(BoardService);
    boardRepository = module.get<Repository<Board>>(boardRepositoryToken);
  });

  it('boardService should be defined', () => {
    expect(boardService).toBeDefined();
  });

  it('boardRepository should be defined', () => {
    expect(boardService).toBeDefined();
  });

  describe('특정 게시글 조회', () => {
    it('1번 게시글 작성자의 실명은 [신형만]이다.', async () => {
      jest.spyOn(boardRepository, 'findOneBy').mockResolvedValue({
        id: 1,
        userId: 2,
        title: '...',
        content: '...',
        user: {
          id: 2,
          username: '봉미선',
          password: '...',
          nickname: '...',
        },
      } as Board);
      const board = await boardService.findOneById(1);

      expect(board.user.username).toBe('신형만');
    });
  });
});
